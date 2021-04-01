import {SQUIDEX_REFRESH_QUERY_URL, SQUIDEX_REFRESH_TOKEN_URL} from '../consts';
import {squixedSettings} from '../config/squixedSettings';

const bodyRefreshToken = new URLSearchParams();
bodyRefreshToken.append('grant_type', squixedSettings.grant_type);
bodyRefreshToken.append('client_id', squixedSettings.client_id);
bodyRefreshToken.append('client_secret', squixedSettings.client_secret);
bodyRefreshToken.append('scope', squixedSettings.scope);

export const newTokenRequest = {
    url: SQUIDEX_REFRESH_TOKEN_URL,
    headers: {
        responseType: 'json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyRefreshToken.toString(),
    method: 'post',
};

export const queryRequest = (body, Authorization) => ({
    url: SQUIDEX_REFRESH_QUERY_URL,
    headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization,
        'content-type': 'application/json',
    },
    body: body,
    method: 'post',
});
