// Default variables for all not defined environments and for DEV
let config: any = {
    url: 'http://localhost:4200',
    production: false,
    web_api_key: 'default-api-key',
};

if (!!window && !!(<any>window).angularDevstack) {
    config = (<any>window).angularDevstack.config;
}

export const environment = config;
