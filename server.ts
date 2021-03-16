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
import * as request from 'request';
import * as mCache from 'memory-cache';
import * as cron from 'cron';

const CronJob = cron.CronJob;
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
const plainConfig = config.config;
win['angularDevstack'] = {};
win['angularDevstack']['config'] = plainConfig;

// create global variables
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['HTMLAnchorElement'] = () => null;

global['window'].HTMLElement.prototype.getBoundingClientRect = () => null;

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

const bodyBlogQuery = '{"operationName":"queryBlogContents","variables":{},"query":"query queryBlogContents {\\n  queryBlogContents {\\n    flatData {\\n      articles {\\n        flatData {\\n          content\\n          date\\n          header\\n          img {\\n            url\\n            __typename\\n          }\\n          oneOfMostVisited\\n          type {\\n            flatData {\\n              label\\n              seo {\\n                flatData {\\n                  description\\n                  keywords\\n                  title\\n                  __typename\\n                }\\n                __typename\\n              }\\n              url\\n              order\\n              title\\n              __typename\\n            }\\n            __typename\\n          }\\n          url\\n          seo {\\n            flatData {\\n              description\\n              keywords\\n              title\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}';

let Authorization = null;
let questionsSource = null;
let blogSource = null;

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
const setBlog = () => request(queryRequest(bodyBlogQuery), (_, __, body) => {
    blogSource = JSON.parse(body);
});


const resetAppState = () => {
    request(newTokenRequest, (_, __, body) => {
        const payload = JSON.parse(body);
        Authorization = getAuthorizationFromPayload(payload);
        setQuestions();
        setBlog();
    });

    mCache.clear();
};

// TODO: implement data requests securely
server.get('/graphql', (req, res) => {
    res.status(404).send('data requests are not supported');
});

const getQuestions = (questions) => {
    if (!R.path(['angularDevstack', 'config', 'includeTestData'], window)) {
        return R.reject(
            R.pipe(
                R.prop('flatData'),
                R.propEq('isTestData')(true),
            ),
        )(questions);
    }
    return questions;
};

// Server static files from /app
server.get('/sitemap.xml', (req, res) => {
    const siteMapOriginal = fs.readFileSync(join(APP_FOLDER, 'sitemap.xml'), 'utf8');
    const parseString = xml2js.parseString;
    const questions = getQuestions(questionsSource.data.queryQuestionContents);
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

// cache by detail variable
server.post('/squidex', ({body}, res) => {
    const { operationName, variables } = body;
    const cacheKey = getMCacheKeySquidex(operationName + JSON.stringify(variables));
    const data = plainConfig.cacheSSR ? mCache.get(cacheKey) : false;
    if (!data) {
        request(queryRequest(JSON.stringify(body)), (err, requestRes, responseBody) => {
            if (plainConfig.cacheSSR) {
                mCache.put(cacheKey, responseBody);
            }
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
    const cached = plainConfig.cacheSSR ? mCache.get(cacheKey) : false;

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
            if (plainConfig.cacheSSR) {
                mCache.put(cacheKey, html);
            }
            return res.send(html);
        });
    }
});

// All routes (without server side routes) are send as normal client side app
server.get('*', (req, res) => {
    console.log('REQUEST');
    return res.sendFile(join(APP_FOLDER, 'index.html'));
});

// Start up the Node server
server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

const job = new CronJob(
    '0 22 * * *',
    resetAppState,
    null,
    true,
    'Europe/Prague',
);
job.start();
resetAppState();

export * from './src/app.server';
