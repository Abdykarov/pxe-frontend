import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// own classes
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'X-API-Key': `${environment.x_api_key}`,
            },
        });

        return next.handle(request);
    }
}
