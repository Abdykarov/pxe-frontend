import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { SecuringYourDataService } from 'src/common/cms/services/securing-your-data.service';

@Injectable({
    providedIn: 'root',
})
export class SecuringYourDataResolver implements Resolve<any> {

    constructor(
        private securingYourDataService: SecuringYourDataService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.securingYourDataService.getSecuringYourData();
    }
}
