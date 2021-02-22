import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { FaqService } from 'src/common/cms/services/faq.service';
import { IFaq } from 'src/common/cms/models/faq';

@Injectable({
    providedIn: 'root',
})
export class FaqResolver implements Resolve<any> {

    constructor(
        private faqService: FaqService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFaq[]> {
        return this.faqService.getFaq();
    }
}
