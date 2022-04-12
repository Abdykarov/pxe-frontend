// Default variables for all not defined environments and for DEV
// !!! it is necessary to follow the JSON structure !!!
//api/content/pxe-parc4u/graphql for localhost developing url_cms_api
//cms/api for ssr
//siteKey test all valid
window.angularDevstack = {
    "config": {
        "gaId": "",
        "gtmId": "GTM-58VS48R",
        "environment": "test",
        "production": false,
        "re_captcha": {
            "siteKey": "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
            "size": "invisible",
            "errorMode": "handled",
            "badge": "none"
        },
        "cms": {
            "client_id": "pxe-parc4u:default",
            "client_secret": "oummskzkwilyxzzufv1xhcmg7ljxpavxuq6wiu9oizqx",
            "grand_type": "client_credentials",
            "scope": "squidex-api"
        },
        "sAnalyticsTId": "",
        "url": "http://localhost:4200",
        "url_graphql": "http://localhost:4200/graphql",
        "url_cms_assets": "https://squidex-preview.lnd.bz/api/assets/",
        "url_cms": "https://squidex-preview.lnd.bz",
        "url_cms_local": "https://squidex-preview.lnd.bz",
        "url_cms_api": "api/content/pxe-parc4u/graphql",
        "url_api": "http://localhost:4200/api",
        "web_api_key": "default-api-key",
        "x_api_key": "6DBE159EAAB67C2AFD31DED689608711",
        "includeTestData": false,
        "useDirectlyCMS": true
    }
};
