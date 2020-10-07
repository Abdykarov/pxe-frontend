import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { PattensOfContractsService } from 'src/common/cms/services/pattens-of-contracts.service';

@Injectable({
    providedIn: 'root',
})
export class PatternsOfContractsResolver implements Resolve<any> {

    constructor(
        private pattensOfContractsService: PattensOfContractsService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.pattensOfContractsService.getPatternsOfContracts();
    }
}
