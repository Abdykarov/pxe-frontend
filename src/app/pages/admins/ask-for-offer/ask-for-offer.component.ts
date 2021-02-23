import {
    Component,
    OnInit,
} from '@angular/core';
import {
    invoices,
    rows,
} from './ask-for-offer.config';

@Component({
    selector: 'lnd-ask-for-offer',
    templateUrl: './ask-for-offer.component.html',
    styleUrls: ['./ask-for-offer.component.scss'],
})
export class AskForOfferComponent implements OnInit {

    public rows = rows;
    public invoices = invoices;

    constructor() { }

    ngOnInit(): void {
    }

    public routerToFill = (aaa) => {
        console.log(aaa);
    }
}
