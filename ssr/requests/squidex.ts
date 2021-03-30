import * as request from 'request';
import * as mCache from 'memory-cache';
import * as cron from 'cron';
const CronJob = cron.CronJob;

import {SQUIDEX_REFRESH_QUERY_URL, SQUIDEX_REFRESH_TOKEN_URL} from '../consts';
import {squixedSettings} from '../config/squixedSettings';
import {getAuthorizationFromPayload, getMCacheKeySquidex} from '../utils';
import {plainConfig, server} from '../init';

const bodyRefreshToken = new URLSearchParams();
bodyRefreshToken.append('grant_type', squixedSettings.grant_type);
bodyRefreshToken.append('client_id', squixedSettings.client_id);
bodyRefreshToken.append('client_secret', squixedSettings.client_secret);
bodyRefreshToken.append('scope', squixedSettings.scope);

let Authorization = null;
export let questionsSource = null;
export let blogSource = null;
export let faqTypeSource = null;

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

const bodyQuestionsQuery = '{ operationName: \'queryQuestionContents\',\n' +
    '  variables: {},\n' +
    '  query:\n' +
    '   \'query queryQuestionContents {queryQuestionContents {flatData {id,fullContent,shortContent,isTestData,oneOfMostVisited,tag {flatData {  label  type' +
    '  url  __typename}__typename}header,url,vatNumber,__typename}__typename}}\' }';

const bodyBlogQuery = '{"operationName":"queryBlogContents","variables":{},"query":"query queryBlogContents {\n  queryBlogContents {\n    flatData {\n      articles {\n        flatData {\n          content\n          date\n          header\n          img {\n            url\n            __typename\n          }\n          oneOfMostVisited\n          type {\n            flatData {\n              label\n              seo {\n                flatData {\n                  description\n                  keywords\n                  title\n                  __typename\n                }\n                __typename\n              }\n              url\n              order\n              title\n              __typename\n            }\n            __typename\n          }\n          url\n          seo {\n            flatData {\n              description\n              keywords\n              title\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      allType {\n        flatData {\n          label\n          order\n          title\n          seo {\n            flatData {\n              description\n              keywords\n              title\n              __typename\n            }\n            __typename\n          }\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}';
const bodyFaqType = '{"operationName":"queryFaqContents","variables":{},"query":"query queryFaqContents {\n  queryFaqContents {\n    flatData {\n      title\n      breadcrumbTitle\n      tag {\n        flatData {\n          type\n          url\n          label\n          title\n          __typename\n        }\n        __typename\n      }\n      seo {\n        ...seoFragment\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment seoFragment on SeoContent {\n  flatData {\n    description\n    keywords\n    title\n    __typename\n  }\n  __typename\n}\n"}';


const setQuestions = () => request(queryRequest(bodyQuestionsQuery), (_, __, body) => {
    questionsSource = JSON.parse(body);
});

const setBlog = () => request(queryRequest(bodyBlogQuery), (_, __, body) => {
    blogSource = JSON.parse(body);
});

const setFaq = () => request(queryRequest(bodyFaqType), (_, __, body) => {
    faqTypeSource = JSON.parse(body);
});

const resetAppState = () => {
    request(newTokenRequest, (_, __, body) => {
        const payload = JSON.parse(body);
        Authorization = getAuthorizationFromPayload(payload);
        setQuestions();
        setBlog();
        setFaq();
    });

    mCache.clear();
};

// cache by detail variable
server.post('/cms-api', ({body}, res) => {
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

const job = new CronJob(
    '0 22 * * *',
    resetAppState,
    null,
    true,
    'Europe/Prague',
);
job.start();
resetAppState();
