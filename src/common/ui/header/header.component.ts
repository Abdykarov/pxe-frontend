import {
    Component,
    EventEmitter,
    Input,
    HostListener,
    Output,
} from '@angular/core';

import { ScrollToSubscriptionService } from 'src/app/services/scroll-to-subscription';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isHeaderSticked: boolean;

    @Input() isPublic = false;

    @Input() isMenuOpen: boolean;

    @Output()
    public toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostListener('window:scroll')
    onWindowScroll() {
        if (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop > 5) {
                this.isHeaderSticked = true;
        } else {
                this.isHeaderSticked = false;
        }
    }

    constructor(
        private scrollToSubscriptionService: ScrollToSubscriptionService,
    ) {}

    scrollToNewSubscription() {
        this.scrollToSubscriptionService.scrollToSubscription();
    }
}
