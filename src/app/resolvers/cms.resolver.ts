import { Inject, Injectable, Optional } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IS_PRERENDER_PROVIDER } from 'src/app/app.constants';
import { CmsService } from 'src/app/services/cms.service';
import { environment } from 'src/environments/environment';

/**
 * Usefull for local dev and prerender.
 * If is need connect to CMS directly.
 */
@Injectable({
    providedIn: 'root',
})
export class CmsResolver implements Resolve<any> {
    constructor(
        private cmsService: CmsService,
        @Optional() @Inject(IS_PRERENDER_PROVIDER) private isPrerender: boolean
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | any {
        return this.isPrerender || environment.useDirectlyCMS
            ? this.cmsService.getNewToken()
            : of({});
    }
}
