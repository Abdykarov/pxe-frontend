import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { IOffer } from 'src/common/graphql/models/offer.model';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {
    public allowGlobalClick: boolean;
    public showBenefits = false;

    @Input()
    public offer: IOffer;

    @Input()
    public isOwner = false;

    @Output()
    action: EventEmitter<any> = new EventEmitter();

    resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    ngOnInit() {
        this.setComponentByViewPort();

        this.resizeEvent$.subscribe(() => {
            this.setComponentByViewPort();
        });
    }

    public setComponentByViewPort = () => {
        this.allowGlobalClick = window.innerWidth > 992;
        this.showBenefits = this.allowGlobalClick;
    }

    public toggleBenefits(evt) {
        evt.preventDefault();
        this.showBenefits = !this.showBenefits;
    }
}
