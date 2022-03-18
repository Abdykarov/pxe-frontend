import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const gtag;

@Injectable({
    providedIn: 'root',
})
export class GAService {
    public gtm = (event): void => {
        gtag('config', environment.gtmId, {
            page_path: event.urlAfterRedirects,
        });
    };
}
