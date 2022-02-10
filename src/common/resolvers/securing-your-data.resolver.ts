import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ISecuringYourData } from 'src/common/cms/models/securing-your-data';
import { SecuringYourDataService } from 'src/common/cms/services/securing-your-data.service';

@Injectable({
    providedIn: 'root',
})
export class SecuringYourDataResolver implements Resolve<any> {
    constructor(private securingYourDataService: SecuringYourDataService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ISecuringYourData> {
        return this.securingYourDataService.getSecuringYourData();
    }
}
