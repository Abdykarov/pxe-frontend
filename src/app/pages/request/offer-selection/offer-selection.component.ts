import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './offer-selection.config';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { OfferService } from 'src/common/graphql/services/offer.service';

@Component({
    templateUrl: './offer-selection.component.html',
    styleUrls: ['./offer-selection.component.scss'],
})
export class OfferSelectionComponent extends AbstractComponent implements OnInit {
    public stepperProgressConfigSimple1: IStepperProgressItem[] = configStepper;
    public offers: IOffer[] = [];

    constructor(
        private cd: ChangeDetectorRef,
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
}
