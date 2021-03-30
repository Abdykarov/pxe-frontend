import {squixedSettings} from './config/squixedSettings';
import {plainConfig} from './init';

export const PAGE_M_CACHE_PREFIX = 'PAGE_';
export const SQUIDEX_M_CACHE_PREFIX = 'SQUIDEX_';

export const SQUIDEX_URL = squixedSettings[plainConfig.environment].url;
export const SQUIDEX_REFRESH_TOKEN_URL = `${SQUIDEX_URL}identity-server/connect/token`;
export const SQUIDEX_REFRESH_QUERY_URL = `${SQUIDEX_URL}api/content/pxe-parc4u/graphql`;
