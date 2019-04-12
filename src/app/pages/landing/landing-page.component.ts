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
    ScrollService,
} from 'src/app/services/scroll-register';
import { scrollToElementFnc } from 'src/common/utils/scroll-to-element.fnc';
import { ScrollToSubscriptionService } from 'src/app/services/scroll-to-subscription';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent extends AbstractComponent implements OnInit {

    @ViewChild('pxe_subscription')
    pxeSubscriptionForm: ElementRef;

    constructor(
        private scrollService: ScrollService,
        private scrollToSubscriptionService: ScrollToSubscriptionService,
    ) {
        super();

        scrollService.getScrollStream()
            .pipe(takeUntil(this.destroy$))
            .subscribe((scrollTo: SCROLL_TO) => {
                if (scrollTo === SCROLL_TO.LANDING_SUBSCRIPTION) {
                    scrollToElementFnc(this.pxeSubscriptionForm.nativeElement);
                }
            });
    }

    scrollToNewSubscription() {
        this.scrollToSubscriptionService.scrollToSubscription();
    }
}
