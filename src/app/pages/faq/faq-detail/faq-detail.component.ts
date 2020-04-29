import {
    Component,
    OnInit,
} from '@angular/core';
import { AbstractFaqComponent } from 'src/app/pages/faq/abstract-faq.component';

@Component({
    selector: 'lnd-faq-detail',
    templateUrl: './faq-detail.component.html',
    styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent extends AbstractFaqComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    public routerTo = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }
}
