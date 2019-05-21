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
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { INavigationMenu } from 'src/common/ui/navigation/models/navigation.model';
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

    @Input()
    public currentUser: IJwtPayload = null;

    @Input()
    public navigationMenuUserActions: INavigationMenu = [];

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
}
