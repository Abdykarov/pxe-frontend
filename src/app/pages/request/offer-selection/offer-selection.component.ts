import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './offer-selection.config';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { ROUTES } from '../../../app.constants';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;
    public offers: IOffer[] = [];

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private offerService: OfferService,
    ) {
        super();
    }

    ngOnInit () {
        this.offerService.findOffers().subscribe(({data}) => {
            this.offers = data.findOffers;
            console.log(this.offers);
            this.cd.markForCheck();
        });
    }

    nextStep = (id) => {
        console.log(ROUTES.ROUTER_REQUEST_RECAPITULATION);
        this.router.navigate([ROUTES.ROUTER_REQUEST_RECAPITULATION]);
    }
}
