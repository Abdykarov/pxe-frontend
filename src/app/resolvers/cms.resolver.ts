import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import {
    Observable,
    of,
} from 'rxjs';

import { CmsService } from 'src/app/services/cms.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CmsResolver implements Resolve<any> {

    constructor(
        private cmsService: CmsService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return environment.useDirectlyCMS ? this.cmsService.getNewToken() : of({});
    }
}
