/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import 'zone.js/dist/zone-node';

import 'cross-fetch/polyfill';
import * as express from 'express';
import { createWindow } from 'domino';
import * as fs from 'fs';
import * as R from 'ramda';
import * as xml2js from 'xml2js';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_FOLDER = join(DIST_FOLDER, 'app');
// ssr DOM

// index from browser build!
const template = readFileSync(join(DIST_FOLDER, 'app', 'index.html')).toString();
const win = createWindow(template);

// create configuration
const configJs = readFileSync(join(DIST_FOLDER, 'app', 'assets', 'configurations', 'config.js')).toString();
const configString = configJs.substring(
    configJs.indexOf('= ') + 1,
    configJs.indexOf(';'),
);
const config = JSON.parse(configString);
win['angularDevstack'] = {};
win['angularDevstack']['config'] = config.config;

// create global variables
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['HTMLAnchorElement'] = () => null;

const request = require('request');
const mCache = require('memory-cache');
enableProdMode();

// Musi byt pod global['window'] --> jinak window undefined u file replacmentu
import { AppServerModule } from './src/app.server';

server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

const PAGE_M_CACHE_PREFIX = 'PAGE_';
const SQUIDEX_M_CACHE_PREFIX = 'SQUIDEX_';

const SQUIDEX_URL = 'https://squidex.lnd.bz/';
const SQUIDEX_REFRESH_TOKEN_URL = `${SQUIDEX_URL}identity-server/connect/token`;
const SQUIDEX_REFRESH_QUERY_URL = `${SQUIDEX_URL}api/content/pxe-parc4u/graphql`;

const getMCacheKeyPage = (page) => `${PAGE_M_CACHE_PREFIX}_${page}`;
const getMCacheKeySquidex = (operationName) => `${SQUIDEX_M_CACHE_PREFIX}_${operationName}`;

const getAuthorizationFromPayload = ({token_type, access_token}) => `${token_type} ${access_token}`;

const bodyRefreshToken = new URLSearchParams();
bodyRefreshToken.append('grant_type', 'client_credentials');
bodyRefreshToken.append('client_id', 'pxe-parc4u:default');
bodyRefreshToken.append('client_secret', 'oummskzkwilyxzzufv1xhcmg7ljxpavxuq6wiu9oizqx');
bodyRefreshToken.append('scope', 'squidex-api');

const bodyQuestionsQuery = '{ operationName: \'queryQuestionContents\',\n' +
    '  variables: {},\n' +
    '  query:\n' +
    '   \'query queryQuestionContents {queryQuestionContents {flatData {id,fullContent,shortContent,isTestData,oneOfMostVisited,tag {flatData {  label  type' +
    '  url  __typename}__typename}header,url,vatNumber,__typename}__typename}}\' }';

let Authorization = null;
let questionsSource = null;

const newTokenRequest = {
    url: SQUIDEX_REFRESH_TOKEN_URL,
    headers: {
        responseType: 'json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyRefreshToken.toString(),
    method: 'post',
};

const queryRequest = (body) => ({
    url: SQUIDEX_REFRESH_QUERY_URL,
    headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization,
        'content-type': 'application/json',
    },
    body: body,
    method: 'post',
});

const setQuestions = () => request(queryRequest(bodyQuestionsQuery), (_, __, body) => {
    questionsSource = JSON.parse(body);
});

request(newTokenRequest, (_, __, body) => {
    const payload = JSON.parse(body);
    Authorization = getAuthorizationFromPayload(payload);
    setQuestions();
});


// TODO: implement data requests securely
server.get('/graphql', (req, res) => {
    res.status(404).send('data requests are not supported');
});

const getQuestions = (questions) => {
    if (!R.path(['angularDevstack', 'config', 'includeTestData'], window)) {
        return R.reject(R.propEq('isTestData')(true))(questions);
    }
    return questions;
};

// Server static files from /app
server.get('/sitemap.xml', (req, res) => {
    const siteMapOriginal = fs.readFileSync(join(APP_FOLDER, 'sitemap.xml'), 'utf8');
    const parseString = xml2js.parseString;
    const questions = questionsSource.data.queryQuestionContents;
    parseString(siteMapOriginal, (err, result) => {
        questions.forEach(question => {
            const url = R.path(['urlset', 'url' ], result);
            if (url && url.length) {
                url.push({
                    'loc': [
                        `${req.protocol}://${req.get('host')}/faq/${(question.flatData.tag[0].flatData.url)}/${question.flatData.url}`,
                    ],
                });
            }
        });
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        res.set('Content-Type', 'text/xml');
        return res.send(xml);
   });
});

server.post('/squidex', ({body}, res) => {
    const cacheKey = getMCacheKeySquidex(body.operationName);
    const data = mCache.get(cacheKey);
    if (!data) {
        request(queryRequest(JSON.stringify(body)), (err, requestRes, responseBody) => {
            mCache.put(cacheKey, responseBody, 100000);
            return res.send(responseBody);
        });
    } else {
        return res.send(data);
    }
});

// Server static files from /app
server.get('*.*', express.static(join(DIST_FOLDER, 'app')));

// All routes are rendered as server side routes use the Universal engine
server.get('*', (req, res, next) => {

    // Catch secured routes as normal client side app
    if (req.originalUrl.indexOf('/secured') === 0) {
        return next();
    }

    const cacheKey = getMCacheKeyPage(req.originalUrl);
    const cached = mCache.get(cacheKey);

    if ( cached) {
        return res.send(cached);
    } else {
        res.render('index', {
            req: req,
            res: res,
            providers: [
                {
                    provide: 'REQUEST',
                    useValue: (req),
                },
                {
                    provide: 'RESPONSE',
                    useValue: (res),
                },
            ],
        }, (err, html) => {
            mCache.put(cacheKey, html, 100000);
        });
    }
});

// All routes (without server side routes) are send as normal client side app
server.get('*', (req, res) => {
    return res.sendFile(join(APP_FOLDER, 'index.html'));
});

// Start up the Node server
server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

export * from './src/app.server';
