export const getAuthorizationFromPayload = ({ token_type, access_token }) =>
    `${token_type} ${access_token}`;
