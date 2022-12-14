// Default variables for all not defined environments and for MOCK
// !!! it is necessary to follow the JSON structure !!!

window.angularDevstack = {
    "config": {
        "gaId": "",
        "gtmId": "",
        "production": false,
        "url": "http://mock:9002",
        "re_captcha": {
            "siteKey": "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // test all valid
            "size": "invisible",
            "errorMode": "handled",
            "badge": "none"
        },
        "url_graphql": "http://mock:9002/graphql",
        "url_api": "http://mock:9002/api",
        "url_cms": "http://mock:9002/cms-api",
        "web_api_key": "default-api-key",
        "x_api_key": "6DBE159EAAB67C2AFD31DED689608711",
        "includeTestData": true,
        "cacheSSR": false,
        "useDirectlyCMS": false
    }
};
