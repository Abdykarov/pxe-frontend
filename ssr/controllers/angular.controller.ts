// All routes are rendered as server side routes use the Universal engine
import * as mCache from 'memory-cache';
import {getConfig, getMCacheKeyPage} from '../utils';
import {join} from 'path';
import {APP_FOLDER} from '../consts';

const controller = {
    public: (req, res, next) => {
        const config = getConfig();
        // Catch secured routes as normal client side app
        if (req.originalUrl.indexOf('/secured') === 0) {
            return next();
        }

        const cacheKey = getMCacheKeyPage(req.originalUrl);
        const cached = config.cacheSSR ? mCache.get(cacheKey) : false;

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
                if (config.cacheSSR) {
                    mCache.put(cacheKey, html);
                }
                return res.send(html);
            });
        }
    },
    secured: (req, res, next) => {
        return res.sendFile(join(APP_FOLDER, 'index.html'));
    },
};

export default controller;
