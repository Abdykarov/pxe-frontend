import {
    Component,
    EventEmitter,
    Input,
    HostListener,
    Output,
} from '@angular/core';

import { IRouterData } from 'src/app/layouts/model/router-data';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isHeaderSticked: boolean;

    @Input() routerData: IRouterData;

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
        private scrollToService: ScrollToService,
    ) {}

    scrollToNewSubscription() {
        this.scrollToService.scrollToSubscription();
    }
}

