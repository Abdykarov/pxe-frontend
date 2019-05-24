import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IOffer } from 'src/common/graphql/models/offer.model';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {
    public showBenefits = false;

    @Input()
    public offer: IOffer;

    @Input()
    public isOwner = false;

    @Output()
    action: EventEmitter<any> = new EventEmitter();

    public toggleBenefits(evt) {
        evt.preventDefault();
        this.showBenefits = !this.showBenefits;
    }
}
