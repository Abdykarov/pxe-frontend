import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// own classes
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

   constructor(
       private authService: AuthService,
    ) {}

   intercept(
       request: HttpRequest<any>,
       next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (this.authService.isLogged()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getToken()}`,
                    'WEB-API-key': `${environment.web_api_key}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        return next.handle(request);
    }
}
