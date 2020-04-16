import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    takeUntil,
    map,
} from 'rxjs/operators';

import { AbstractLayoutComponent } from 'src/app/layouts/abstract-layout.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    SEO,
} from 'src/app/app.constants';
import { OnlyOneTabActiveService } from 'src/app/services/only-one-tab-active.service';
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
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractLayoutComponent implements OnInit {
    public isMenuOpen = false;
    public itemOpened = null;
    public navConfig: INavigationConfig = [];
    public navigationMenuUserActions: INavigationMenu;

    constructor(
        protected apollo: Apollo,
        public authService: AuthService,
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private navigationApolloService: NavigationApolloService,
        private navigationService: NavigationService,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        private titleService: Title,
        protected scrollToService: ScrollToService,
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
    }

    ngOnInit() {
        super.ngOnInit();
        const currentUser = this.authService.currentUserValue;
        this.navigationMenuUserActions = currentUser && currentUser.supplier ? navigationMenuSuppliersActions : navigationMenuUserActions;
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
