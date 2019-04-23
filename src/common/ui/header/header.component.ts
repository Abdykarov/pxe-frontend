import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    ISettings,
    LoginType, LogoutType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public isHeaderSticked: boolean;
    public signTypeNone = SignType.NONE;
    public loginTypeNone = LoginType.NONE;
    public logoutTypeNone = LogoutType.NONE;

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

    signIn() {
        if (this.settings.signInType === SignType.SCROLL) {
            this.scrollToService.scrollToSubscription();
        } else if (this.settings.signInType === SignType.NAVIGATE) {
            this.router.navigate(['sign-in']);
        }
    }

    login() {
        if (this.settings.loginType === LoginType.NAVIGATE) {
            this.router.navigate(['login']);
        }
    }

    logout() {
        if (this.settings.logoutType === LogoutType.NAVIGATE) {
            this.router.navigate(['logout']);
        }
    }
}

