import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { staticNavigationConfig } from 'src/static/config/navigation.config';

@Component({
    templateUrl: './basic-layout.component.html',
})
export class BasicLayoutComponent extends AbstractComponent implements OnInit {

    public currentUser: IJwtPayload = null;
    public isMenuOpen = false;
    public itemOpened = null;

    public navigationConfig = [];

    public settings: ISettings = {
        isPublic: false,
        isLandingPage: false,
        isSimpleFooter: true,
        isStatic: true,
        loginType: LoginType.NONE,
        hideLeftNavigation: true,
        signUpType: SignType.NONE,
    };

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    constructor (
        private cd: ChangeDetectorRef,
        public router: Router,
    ) {
        super();
        this.navigationConfig = staticNavigationConfig;
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.isMenuOpen = false;
            }
        });
    }

    ngOnInit() {
        this.resizeEvent$.subscribe(() => {
            if (this.isMenuOpen) {
                this.toggleMenuOpen(this.isMenuOpen);
            }
        });
    }

    public toggleMenuOpen = (open: boolean) => {
        this.isMenuOpen = open;
        this.cd.markForCheck();
    }

    public toggleOpenItem = (itemOpened) => {
        this.itemOpened = itemOpened;
    }

    public homeRedirect = () => {
        this.router.navigate([CONSTS.PATHS.EMPTY]);
    }
}
