import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AskForOfferCmsService } from 'src/common/cms/services/ask-for-offer.service';
import { IAskForOffer } from 'src/common/cms/models/ask-for-offer';

@Injectable({
    providedIn: 'root',
})
export class AskForOfferResolver implements Resolve<any> {

    constructor(
        private askForOfferService: AskForOfferCmsService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAskForOffer> {
        return this.askForOfferService.getAskForOffer();
    }
}
