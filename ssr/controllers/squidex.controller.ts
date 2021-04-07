import * as request from 'request';
import * as mCache from 'memory-cache';

import {getConfig, getMCacheKeySquidex} from '../utils';
import {queryRequest} from '../requests/squidex';
import {Authorization} from '../jobs/appState';

const controller = {
    cmsApi: ({body}, res) => {
        const config = getConfig();
        const { operationName, variables } = body;
        const cacheKey = getMCacheKeySquidex(operationName + JSON.stringify(variables));
        const data = config.cacheSSR ? mCache.get(cacheKey) : false;
        if (!data) {
            request(queryRequest(JSON.stringify(body), Authorization), (err, requestRes, responseBody) => {

                if (config.cacheSSR) {
                    mCache.put(cacheKey, responseBody);
                }
                return res.send(responseBody);
            });
        } else {
            return res.send(data);
        }
    },
};

export default controller;
