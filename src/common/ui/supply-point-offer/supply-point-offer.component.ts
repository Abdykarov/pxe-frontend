import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import * as moment from 'moment';

import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
    providers: [DateDiffPipe],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {
    public showBenefits = false;

    public currentTime = new Date();

    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public COMMODITY_TYPE_GAS = CommodityType.GAS;

    public showValidityOfOffer = false;
    public dateDiffValidityOfOffer = Number.MIN_VALUE;
    public invalidOffer = false;

    @Input()
    public supplyPointOffer: ISupplyPointOffer;

    @Input()
    public isOwner = false;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    constructor(
        private dateDiffPipe: DateDiffPipe,
    ) {
        super();
    }

    ngOnInit () {
        const validToDate = moment(this.supplyPointOffer.validTo).toDate();
        this.dateDiffValidityOfOffer = this.dateDiffPipe.transform(
            this.currentTime.toISOString(),
            this.supplyPointOffer.validTo,
            'hours');

        if (this.currentTime.getTime() >= validToDate.getTime()) {
            this.invalidOffer = true;
            return;
        }

        if (this.dateDiffValidityOfOffer > 72) {
            return;
        }

        this.showValidityOfOffer = true;
        this.dateDiffValidityOfOffer = this.dateDiffValidityOfOffer === 0 ? 1 : this.dateDiffValidityOfOffer;
    }

    public toggleBenefits = (event) => {
        event.preventDefault();
        event.cancelBubble = true;
        this.showBenefits = !this.showBenefits;
    }
}
