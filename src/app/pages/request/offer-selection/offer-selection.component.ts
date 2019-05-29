import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './offer-selection.config';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { ROUTES } from 'src/app/app.constants';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
    public supplyPointOffers: ISupplyPointOffer[] = [];

    constructor(
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private offerService: OfferService,
    ) {
        super();
    }

    ngOnInit () {
        const ean = this.route.snapshot.paramMap.get('ean');
        this.offerService.findSupplyPointOffers(ean)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((res: any) => {
                this.supplyPointOffers = res.data.findSupplyPointOffers;
                this.cd.markForCheck();
            });
    }

    action = (supplyPointOffer) => {
        this.router.navigate([ROUTES.ROUTER_REQUEST_RECAPITULATION]);
    }
}
