import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {
    public showBenefits = false;

    public currentTime = new Date();

    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public COMMODITY_TYPE_GAS = CommodityType.GAS;

    @Input()
    public supplyPointOffer: ISupplyPointOffer;

    @Input()
    public isOwner = false;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    public toggleBenefits = (event) => {
        event.preventDefault();
        event.cancelBubble = true;
        this.showBenefits = !this.showBenefits;
    }
}
