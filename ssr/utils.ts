import {PAGE_M_CACHE_PREFIX, SQUIDEX_M_CACHE_PREFIX} from './consts';

export const getMCacheKeyPage = (page) => `${PAGE_M_CACHE_PREFIX}_${page}`;
export const getMCacheKeySquidex = (operationName) => `${SQUIDEX_M_CACHE_PREFIX}_${operationName}`;

export const getAuthorizationFromPayload = ({token_type, access_token}) => `${token_type} ${access_token}`;
