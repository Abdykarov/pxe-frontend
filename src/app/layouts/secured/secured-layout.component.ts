import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    takeUntil,
    map,
} from 'rxjs/operators';

import { AbstractLayoutComponent } from 'src/app/layouts/abstract-layout.component';
import { AuthService } from 'src/app/services/auth.service';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import {
    INavigationConfig,
    INavigationMenu,
} from 'src/common/ui/navigation/models/navigation.model';
import { IStoreUi } from 'src/common/graphql/models/store.model';
import { NavigationService as NavigationApolloService} from 'src/common/graphql/services/navigation.service';
import { navigationMenuUserActions } from './services/navigation.config';
import { NavigationService } from './services/navigation.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractLayoutComponent implements OnInit {
    public currentUser: IJwtPayload = this.authService.currentUserValue;
    public isMenuOpen = false;
    public itemOpened = null;
    public navConfig: INavigationConfig = [];
    public navigationMenuUserActions: INavigationMenu = navigationMenuUserActions;

    constructor(
        protected apollo: Apollo,
        protected authService: AuthService,
        private cd: ChangeDetectorRef,
        private navigationApolloService: NavigationApolloService,
        private navigationService: NavigationService,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
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
                }
            });
    }

    ngOnInit() {
        this.resizeEvent$.subscribe(() => {
            if (this.isMenuOpen) {
                this.toggleMenuOpen();
            }
        });
    }

    public toggleNavigationItem (navigationItem) {
        this.navigationApolloService.toggleNavigationItem(navigationItem)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe( res => {
                this.isMenuOpen = false;
            });
    }

    public toggleMenuOpen = () => {
        this.isMenuOpen = !this.isMenuOpen;
        this.cd.markForCheck();
    }
}
