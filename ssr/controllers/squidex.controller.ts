import * as mCache from 'memory-cache';
import * as request from 'request';

import { appState } from 'ssr/jobs/appState';
import {
    getConfig,
    getMCacheKeySquidex,
} from 'ssr/utils';
import { queryRequest } from 'ssr/requests/squidex';
import { THE_MOST_SECRET_PASSWORD_IN_HOGWARTS_TO_RESET_CACHE } from 'ssr/consts';

const controller = {
    cmsApi: ({body}, res) => {
        const state = appState.getState();
        const config = getConfig();
        const { operationName, variables } = body;
        const cacheKey = getMCacheKeySquidex(operationName + JSON.stringify(variables));
        const data = config.cacheSSR ? mCache.get(cacheKey) : false;
        if (!data) {
            request(queryRequest(JSON.stringify(body), state.Authorization), (err, requestRes, responseBody) => {

                if (config.cacheSSR) {
                    mCache.put(cacheKey, responseBody);
                }
                return res.send(responseBody);
            });
        } else {
            return res.send(data);
        }
    },
    deleteCache: ({body}, res, next) => {
        if (body.password === THE_MOST_SECRET_PASSWORD_IN_HOGWARTS_TO_RESET_CACHE) {
            appState.resetAppState();
            return res.sendStatus(200);
        }

        return res.sendStatus(403);
    },
};

export default controller;
