import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import * as R_ from 'ramda-extension';

import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {
    private static readonly MAX_HOURS_VALIDITY_OF_OFFER_DISPLAYED = 72;
    private static readonly MIN_HOURS_VALIDITY_OF_OFFER_DISPLAYED = 1;
    private static readonly ZERO_HOURS_VALIDITY_OF_OFFER = 0;

    public showBenefits = false;

    public currentTime = new Date();

    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public COMMODITY_TYPE_GAS = CommodityType.GAS;

    public showValidityOfOffer = false;
    public dateDiffValidityOfOffer = Number.MIN_VALUE;

    @Input()
    public supplyPointOffer: ISupplyPointOffer;

    @Input()
    public isOwner = false;

    @Input()
    public interactive = false;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    constructor(
        private dateDiffPipe: DateDiffPipe,
    ) {
        super();
    }

    ngOnInit () {
        this.dateDiffValidityOfOffer = this.dateDiffPipe.transform(
            this.currentTime.toISOString(),
            this.supplyPointOffer.validTo,
            'hours',
        );

        this.dateDiffValidityOfOffer =
            this.dateDiffValidityOfOffer === SupplyPointOfferComponent.ZERO_HOURS_VALIDITY_OF_OFFER ?
                SupplyPointOfferComponent.MIN_HOURS_VALIDITY_OF_OFFER_DISPLAYED : this.dateDiffValidityOfOffer;

        if (this.dateDiffValidityOfOffer <= SupplyPointOfferComponent.MAX_HOURS_VALIDITY_OF_OFFER_DISPLAYED) {
            this.showValidityOfOffer = true;
        }

        if (R_.isString(this.supplyPointOffer.benefits)) {
            try {
                this.supplyPointOffer.benefits = JSON.parse(<string>this.supplyPointOffer.benefits);
            } catch (e) {
                this.supplyPointOffer.benefits = null;
            }
        }
    }

    public toggleBenefits = (event) => {
        event.preventDefault();
        event.cancelBubble = true;
        this.showBenefits = !this.showBenefits;
    }
}
