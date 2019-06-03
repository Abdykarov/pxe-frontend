import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// own classes
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {

        if (request.url.match(/api\//)) { // api call
            const authReq = request.clone({
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this.authService.getToken(),
                    'Content-Type': 'application/json',
                    'X-API-Key': `${environment.x_api_key}`,
                }),
            });
            return next.handle(authReq);
        }

        request = request.clone({
            setHeaders: {
                'X-API-Key': `${environment.x_api_key}`,
            },
        });

        return next.handle(request);
    }
}
