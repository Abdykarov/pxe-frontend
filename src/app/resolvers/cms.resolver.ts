import { Inject, Injectable, Optional } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CmsService } from 'src/app/services/cms.service';
import { IS_PRERENDER_PROVIDER } from '../app.constants';

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
        return this.isPrerender ? this.cmsService.getNewToken() : of({});
    }
}
