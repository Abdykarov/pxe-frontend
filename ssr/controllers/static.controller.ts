import * as mCache from 'memory-cache';
import {APP_FOLDER, DIST_FOLDER, plainConfig, server} from '../init';
import * as express from 'express';
import {join} from 'path';
import {getMCacheKeyPage} from '../utils';

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
