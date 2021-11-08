import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IAskForOffer } from 'src/common/cms/models/ask-for-offer';
import { AskForOfferCmsService } from 'src/common/cms/services/ask-for-offer.service';

@Injectable({
    providedIn: 'root',
})
export class AskForOfferResolver implements Resolve<any> {
    constructor(private askForOfferService: AskForOfferCmsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IAskForOffer> {
        return this.askForOfferService.getAskForOffer();
    }
}
