import {
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    Renderer2,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { IJwtPayload } from 'src/common/services/model/auth.model';
import { staticNavigationConfig } from 'src/static/config/navigation.config';

@Component({
    templateUrl: './basic-layout.component.html',
})
export class BasicLayoutComponent
    extends AbstractComponent
    implements OnInit, OnDestroy
{
    public activeUrl: string;
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

    public resizeEvent$ = fromEvent(window, 'resize').pipe(
        takeUntil(this.destroy$),
        debounceTime(200)
    );

    constructor(
        private cd: ChangeDetectorRef,
        private renderer: Renderer2,
        protected route: ActivatedRoute,
        public router: Router
    ) {
        super();
        this.navigationConfig = staticNavigationConfig;
        router.events.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.removeBodyClasses();
                const isPublic = route.snapshot.firstChild.data?.isPublic;
                this.renderer.addClass(
                    document.body,
                    isPublic || isPublic === undefined ? 'public' : 'secured'
                );
                this.isMenuOpen = false;
                this.activeUrl = this.router.url;
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
    };

    public toggleOpenItem = (itemOpened) => {
        this.itemOpened = itemOpened;
    };

    public homeRedirect = () => {
        this.router.navigate([CONSTS.PATHS.EMPTY]);
    };

    private removeBodyClasses = () => {
        this.renderer.removeClass(document.body, 'public');
        this.renderer.removeClass(document.body, 'secured');
    };

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.removeBodyClasses();
    }
}
