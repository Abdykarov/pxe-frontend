import {APP_FOLDER, DIST_FOLDER, plainConfig, PORT, server} from './init';
import * as mCache from 'memory-cache';
import * as R from 'ramda';
import * as express from 'express';
import {join} from 'path';
import { getMCacheKeyPage} from './utils';

// TODO: implement data requests securely
server.get('/graphql', (req, res) => {
    res.status(404).send('data requests are not supported');
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
    return res.sendFile(join(APP_FOLDER, 'index.html'));
});

// Start up the Node server
server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

export * from '../src/app.server';
