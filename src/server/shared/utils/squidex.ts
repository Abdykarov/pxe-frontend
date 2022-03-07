import {
    PAGE_M_CACHE_PREFIX,
    SQUIDEX_M_CACHE_PREFIX,
} from 'src/server/shared/consts';

export const getMCacheKeyPage = (page: string): string =>
    `${PAGE_M_CACHE_PREFIX}_${page}`;
export const getMCacheKeySquidex = (operationName: string): string =>
    `${SQUIDEX_M_CACHE_PREFIX}_${operationName}`;

export const getAuthorizationFromPayload = ({
    token_type,
    access_token,
}): string => `${token_type} ${access_token}`;
