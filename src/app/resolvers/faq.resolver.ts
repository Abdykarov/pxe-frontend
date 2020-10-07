import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { FaqService } from 'src/common/cms/services/faq.service';

@Injectable({
    providedIn: 'root',
})
export class FaqResolver implements Resolve<any> {

    constructor(
        private faqService: FaqService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {
        return this.faqService.getFaq();
    }
}
