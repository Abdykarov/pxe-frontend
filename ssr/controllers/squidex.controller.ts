// import * as request from 'request';
// import * as mCache from 'memory-cache';
//
// import {plainConfig, server} from '../init';
// import {getMCacheKeySquidex} from '../utils';
// import {queryRequest} from '../requests/squidex';
// import {Authorization} from '../jobs/appState';
//
// server.post('/cms-api', ({body}, res) => {
//     const { operationName, variables } = body;
//     const cacheKey = getMCacheKeySquidex(operationName + JSON.stringify(variables));
//     const data = plainConfig.cacheSSR ? mCache.get(cacheKey) : false;
//     if (!data) {
//         request(queryRequest(JSON.stringify(body), Authorization), (err, requestRes, responseBody) => {
//
//             if (plainConfig.cacheSSR) {
//                 mCache.put(cacheKey, responseBody);
//             }
//             return res.send(responseBody);
//         });
//     } else {
//         return res.send(data);
//     }
// });
