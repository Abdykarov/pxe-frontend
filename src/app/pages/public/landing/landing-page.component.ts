import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    SCROLL_TO,
    ScrollToService,
} from 'src/app/services/scroll-to.service';
import { scrollToElementFnc } from 'src/common/utils/scroll-to-element.fnc';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing-page.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent extends AbstractComponent implements OnInit {

    @ViewChild('pxe_subscription')
    public pxeSubscriptionForm: ElementRef;

    constructor(
        private scrollToService: ScrollToService,
    ) {
        super();

        this.scrollToService.getScrollStream()
            .pipe(takeUntil(this.destroy$))
            .subscribe((scrollTo: SCROLL_TO) => {
                if (scrollTo === SCROLL_TO.LANDING_SUBSCRIPTION) {
                    scrollToElementFnc(this.pxeSubscriptionForm.nativeElement);
                }
            });
    }

    scrollToNewSubscription() {
        this.scrollToService.scrollToSubscription();
    }
}
