import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ISettings, SignType } from 'src/app/layouts/models/router-data.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isHeaderSticked: boolean;
    public signTypeNone = SignType.NONE;

    @Input() settings: ISettings;

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
        private router: Router,
    ) {}

    signIn(signInType: SignType) {
        if (signInType === SignType.SCROLL)
            this.scrollToService.scrollToSubscription();
        else
            this.router.navigate(['sign-in']);
    }

    login() {
        this.router.navigate(['login']);
    }
}

