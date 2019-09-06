import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ApolloService } from 'src/app/services/apollo-service';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { defaultState } from 'src/app/pages/logout/logout-page.config';
import { IStateRouter } from 'src/app/pages/logout/logout-page.model';

@Component({
    templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent extends AbstractComponent implements OnInit {
    public error = false;
    public state: IStateRouter = defaultState;
    public visible = false;

    constructor(
        private apollo: Apollo,
        private apolloService: ApolloService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.state = window.history.state;
        }
    }

    ngOnInit() {
        this.logout();
    }

    public logout = () => {
        this.authService.logout()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.apolloService.resetStore().then(() => {
                        this.router.navigate([CONSTS.PATHS.EMPTY])
                            .then(() => {
                                if (this.state.refresh) {
                                    window.location.reload();
                                }
                            });

                    });
                },
                () => {
                    this.error = true;
                    this.cd.markForCheck();
                });
    }

    public reload = ($event) => {
        $event.preventDefault();
        this.error = false;
        this.logout();
    }
}
