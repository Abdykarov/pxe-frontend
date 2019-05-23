import {
    Component,
    Input,
} from '@angular/core';

import { IOffer } from 'src/common/graphql/models/offer.model';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})

export class SupplyPointOfferComponent {

    public readonly SELECTED_OFFER = 'selected';
    public readonly NON_SELECTED_OFFER = 'non_selected';
    public readonly OWNER_OFFER = 'owner';

    @Input()
    public offer: IOffer;

    @Input()
    public typeOffer: string = this.SELECTED_OFFER;

}
