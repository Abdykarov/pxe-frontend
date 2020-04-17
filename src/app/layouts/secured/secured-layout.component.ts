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
    CONSTS,
    SEO,
} from 'src/app/app.constants';
import { moreTabDialog } from 'src/app/services/model/only-one-tab-active.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import {
    INavigationConfig,
    INavigationMenu,
} from 'src/common/ui/navigation/models/navigation.model';
import { IStoreUi } from 'src/common/graphql/models/store.model';
import { NavigationService as NavigationApolloService} from 'src/common/graphql/services/navigation.service';
import {
    navigationMenuSuppliersActions,
    navigationMenuUserActions,
} from './services/navigation.config';
import { NavigationService } from './services/navigation.service';
import { OnlyOneTabActiveService } from 'src/app/services/only-one-tab-active.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractLayoutComponent implements OnInit, OnDestroy {
    public isMenuOpen = false;
    public itemOpened = null;
    public navConfig: INavigationConfig = [];
    public navigationMenuUserActions: INavigationMenu;

    constructor(
        protected apollo: Apollo,
        public authService: AuthService,
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private modalsService: ModalService,
        private navigationApolloService: NavigationApolloService,
        private navigationService: NavigationService,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        private titleService: Title,
        protected scrollToService: ScrollToService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super(
            apollo,
            authService,
            overlayService,
            route,
            router,
            scrollToService,
        );
        this.titleService.setTitle(CONSTS.TITLES.DEFAULT);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.LANDING_PAGE,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: SEO.META_KEYWORDS.LANDING_PAGE.toString(),
        });

        this.navigationService.getNavigationConfig();

        this.navigationApolloService.getConfig()
            .pipe(
                takeUntil(this.destroy$),
                map(R.path(['data', 'ui'])),
            )
            .subscribe((current: IStoreUi)  => {
                if (current.securedLayout) {
                    this.navConfig = current.securedLayout.navigationConfig;
                    this.showOverlay = current.showOverlay;
                    this.cd.markForCheck();
                }
            });

        this.onlyOneTabActiveService.setActiveTab();
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('storage', this.handleStoreChange);
        }

        this.modalsService.closeModalData$
            .pipe(
                filter(R_.isNotNil),
            )
            .subscribe(modal => {
                if (modal.modalType === CONSTS.MODAL_TYPE.MORE_TABS) {
                    if (modal.confirmed) {
                        this.onlyOneTabActiveService.setActiveTab();
                        location.reload();
                    } else {
                        this.router.navigate([CONSTS.PATHS.EMPTY]);
                    }
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    // !this.onlyOneTabActiveService.isThisTabActive()
    private handleStoreChange = (storageEvent: StorageEvent) => {
        const newValue = storageEvent.newValue;
        if (
            storageEvent.key === CONSTS.ONLY_ONE_TAB_ACTIVE.NAME_COOKIE &&
            newValue !== this.onlyOneTabActiveService.uuid
        ) {
            if (CONSTS.ONLY_ONE_TAB_ACTIVE.LOGOUT === newValue) {
                this.router.navigate([CONSTS.PATHS.EMPTY]);
            } else if (CONSTS.ONLY_ONE_TAB_ACTIVE.CLOSED !== newValue) {
                this.modalsService
                    .showModal$.next(moreTabDialog());
            }
        }
    }

    ngOnInit() {
        super.ngOnInit();
        const currentUser = this.authService.currentUserValue;
        this.navigationMenuUserActions = currentUser && currentUser.supplier ? navigationMenuSuppliersActions : navigationMenuUserActions;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
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
