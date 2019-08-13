import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { first } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { defaults } from 'src/common/graphql/resolvers';

@Component({
    templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent extends AbstractComponent implements OnInit {
    public error = false;

    public counter = 0;
    public visible = false;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();
    }

    ngOnInit() {
        this.logout();
    }

    public logout = () => {
        this.authService.logout()
            .pipe(first())
            .subscribe(
                () => {
                    const apolloClient = this.apollo.getClient();
                    apolloClient.resetStore()
                        .then(() => {
                            apolloClient.cache.writeData({
                                data: defaults,
                            });
                            this.router.navigate([CONSTS.PATHS.EMPTY]);
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
