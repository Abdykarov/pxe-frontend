import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { TransferHttpResponseInterceptor } from './transfer-http-response.interceptor';

export const InterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TransferHttpResponseInterceptor,
        multi: true,
    },
];
