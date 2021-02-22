import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { FaqService } from 'src/common/cms/services/faq.service';
import { IFaq } from 'src/common/cms/models/faq';
import { Tag } from 'src/app/services/model/faq.model';

@Injectable({
    providedIn: 'root',
})
export class FaqResolver implements Resolve<any> {

    constructor(
        private faqService: FaqService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFaq> {
        console.log('__[]__');
        console.log(route.params?.tag);
        const faqType = route.params?.tag || Tag.GENERAL;
        return this.faqService.getFaq(faqType);
    }
}
