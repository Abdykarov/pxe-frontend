import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { Apollo } from 'apollo-angular';
import {
    takeUntil,
    map,
    filter,
} from 'rxjs/operators';

import { AbstractLayoutComponent } from 'src/app/layouts/abstract-layout.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CommodityTypesLowerCase,
    CONSTS,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { CookiesService } from 'src/app/services/cookies.service';
import {
    INavigationConfig,
    INavigationItem,
    INavigationMenu,
} from 'src/common/ui/navigation/models/navigation.model';
import { IStoreUi } from 'src/common/graphql/models/store.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { NavigationService as NavigationApolloService} from 'src/common/graphql/services/navigation.service';
import { NavigationService } from './services/navigation.service';
import { OnlyOneTabActiveService } from 'src/app/services/only-one-tab-active.service';
import { OnlyOneTabActiveState } from 'src/app/services/model/only-one-tab-active.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractLayoutComponent implements OnInit, OnDestroy {
    public commodityTypePower = CommodityTypesLowerCase.POWER;
    public subjectTypeIndividual = SubjectTypeLowerCase.INDIVIDUAL;
    public isMenuOpen = false;
    public itemOpened = null;
    public navConfig: INavigationConfig = [];
    public navigationMenuUserActions: INavigationMenu;

    constructor(
        protected apollo: Apollo,
        public authService: AuthService,
        private cd: ChangeDetectorRef,
        protected cookieService: CookiesService,
        private metaService: Meta,
        private modalsService: ModalService,
        private navigationApolloService: NavigationApolloService,
        private navigationService: NavigationService,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        protected overlayService: OverlayService,
        private renderer: Renderer2,
        protected route: ActivatedRoute,
        protected router: Router,
        protected sAnalyticsService: SAnalyticsService,
        public scrollToService: ScrollToService,
        private titleService: Title,
        @Inject(PLATFORM_ID) public platformId: string,
    ) {
        super(
            apollo,
            authService,
            cookieService,
            overlayService,
            platformId,
            route,
            router,
            sAnalyticsService,
            scrollToService,
        );
        this.titleService.setTitle(CONSTS.TITLES.DEFAULT);
        this.navigationService.getNavigationConfig();

        this.navigationApolloService.getConfig()
            .pipe(
                takeUntil(this.destroy$),
                map(R.path(['data', 'ui'])),
            )
            .subscribe((current: IStoreUi)  => {
                if (current.securedLayout) {
                    const userLoginProvider = authService.currentUserValue.provider;
                    const sourceConfig = current.securedLayout.navigationConfig[0];
                    this.navConfig = [this.navigationService.filterNavigationByProvider(sourceConfig, userLoginProvider)];
                    this.showOverlay = current.showOverlay;
                    this.cd.markForCheck();
                }
            });

        this.onlyOneTabActiveService.setActiveTab();
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('storage', this.handleStoreChange);

            this.modalsService.closeModalData$
                .pipe(
                    filter(R_.isNotNil),
                )
                .subscribe(modal => {
                    if (modal.modalType === CONSTS.MODAL_TYPE.MORE_TABS) {
                        if (modal.confirmed) {
                            this.onlyOneTabActiveService.setActiveTab();
                            this.authService.homeRedirect(true);
                        } else {
                            this.authService.logoutForced(false);
                        }
                    }
                    this.modalsService.closeModalData$.next(null);
                });
        }
    }

    private handleStoreChange = (storageEvent: StorageEvent) => {
        const newValue = storageEvent.newValue;
        if (
            storageEvent.key === CONSTS.STORAGE_HELPERS.ACTIVE_TAB &&
            newValue !== this.onlyOneTabActiveService.uuid
        ) {
            if (OnlyOneTabActiveState.LOGOUT === newValue) {
                this.authService.currentUserSubject$.next(null);
                this.modalsService.closeModal$.next(null);
                this.router.navigate([CONSTS.PATHS.LOGIN]);
            } else if (OnlyOneTabActiveState.CLOSED !== newValue) {
                this.modalsService
                    .showModal$.next(this.onlyOneTabActiveService.moreTabDialog());
            }
        }
    }

    ngOnInit() {
        super.ngOnInit();

        this.renderer.addClass(document.body, 'secured');
        const userType = this.authService.currentUserValue.type;
        const userLoginProvider = this.authService.currentUserValue.provider;
        const sourceConfig = this.navigationService.MENU_BY_USER_TYPE_MAPPING[userType].navigationMenuActions;
        this.navigationMenuUserActions = this.navigationService.filterNavigationByProvider(sourceConfig, userLoginProvider);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.renderer.removeClass(document.body, 'secured');
        if (isPlatformBrowser(this.platformId)) {
            window.removeEventListener('storage', this.handleStoreChange);
        }
    }

    public toggleNavigationItem = (navigationItem) => {
        this.navigationApolloService.toggleNavigationItem(navigationItem)
            .pipe(
                takeUntil(this.destroy$),
                map(R.path(['data', 'openItem', 'ui', 'securedLayout'])),
            )
            .subscribe( res => {
                this.isMenuOpen = false;
                this.cd.markForCheck();
            });
    }
}
