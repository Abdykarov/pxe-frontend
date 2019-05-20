import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';
import { IDropdownItem } from '../dropdown/models/item.model';
import { INavigationConfig } from '../navigation/models/navigation.model';
import { navigationConfigUserActions } from 'src/app/layouts/secured/services/navigation.config';
import { IJwtPayload } from '../../../app/services/model/auth.model';

@Component({
    selector: 'lnd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public isHeaderSticked: boolean;
    public signTypeNone = SignType.NONE;
    public loginTypeNone = LoginType.NONE;

    public currentUser: IJwtPayload = null;

    public navigationConfigUserActions: INavigationConfig = navigationConfigUserActions;

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
        private authService: AuthService,
        private scrollToService: ScrollToService,
        private router: Router,
    ) {}

    signUp() {
        if (this.settings.signUpType === SignType.SCROLL) {
            this.scrollToService.scrollToSubscription();
        } else if (this.settings.signUpType === SignType.NAVIGATE) {
            this.router.navigate([CONSTS.PATHS.SIGN_UP]);
        }
    }

    login() {
        if (this.settings.loginType === LoginType.NAVIGATE) {
            this.router.navigate([CONSTS.PATHS.LOGIN]);
        }
    }

    navigateTo(url: string) {
        this.router.navigate([url]);
    }

    ngOnInit(): void {
        if (this.authService.isLogged()) {
            this.currentUser = this.authService.currentUserValue;
        }
    }
}
