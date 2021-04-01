import {squixedSettings} from './config/squixedSettings';
import {plainConfig} from './init';

export const PAGE_M_CACHE_PREFIX = 'PAGE_';
export const SQUIDEX_M_CACHE_PREFIX = 'SQUIDEX_';

export const SQUIDEX_URL = squixedSettings[plainConfig.environment].url;
export const SQUIDEX_REFRESH_TOKEN_URL = `${SQUIDEX_URL}identity-server/connect/token`;
export const SQUIDEX_REFRESH_QUERY_URL = `${SQUIDEX_URL}api/content/pxe-parc4u/graphql`;

export const bodyQuestionsQuery = '{ operationName: \'queryQuestionContents\',\n' +
    '  variables: {},\n' +
    '  query:\n' +
    '   \'query queryQuestionContents {queryQuestionContents {flatData {id,fullContent,shortContent,isTestData,oneOfMostVisited,tag {flatData {  label  type' +
    '  url  __typename}__typename}header,url,vatNumber,__typename}__typename}}\' }';

export const bodyBlogQuery = '{"operationName":"queryBlogContents","variables":{},"query":"query queryBlogContents {\n  queryBlogContents {\n    flatData {\n      articles {\n        flatData {\n          content\n          date\n          header\n          img {\n            url\n            __typename\n          }\n          oneOfMostVisited\n          type {\n            flatData {\n              label\n              seo {\n                flatData {\n                  description\n                  keywords\n                  title\n                  __typename\n                }\n                __typename\n              }\n              url\n              order\n              title\n              __typename\n            }\n            __typename\n          }\n          url\n          seo {\n            flatData {\n              description\n              keywords\n              title\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      allType {\n        flatData {\n          label\n          order\n          title\n          seo {\n            flatData {\n              description\n              keywords\n              title\n              __typename\n            }\n            __typename\n          }\n          url\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}';
export const bodyFaqType = '{"operationName":"queryFaqContents","variables":{},"query":"query queryFaqContents {\n  queryFaqContents {\n    flatData {\n      title\n      breadcrumbTitle\n      tag {\n        flatData {\n          type\n          url\n          label\n          title\n          __typename\n        }\n        __typename\n      }\n      seo {\n        ...seoFragment\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment seoFragment on SeoContent {\n  flatData {\n    description\n    keywords\n    title\n    __typename\n  }\n  __typename\n}\n"}';
