import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import {
    first,
    map,
    takeUntil,
} from 'rxjs/operators';

import * as queries from 'src/common/graphql/queries';
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';

interface ICounterResponse {
    counter: {
        current: number;
    };
}

interface IVisiblityResponse {
    visibility: {
        current: boolean;
    };
}

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
        // this.logout();

        this.apollo
            .watchQuery<ICounterResponse>({
                query: queries.getCurrentCounter,
            })
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                map(result => result.data && result.data.counter && result.data.counter.current),
            )
            .subscribe((current) => {
                console.log('%c ***** counter *****', 'background: #bada55; color: #000; font-weight: bold', current);
                this.counter = current;
                this.cd.markForCheck();
            });

        this.apollo
            .watchQuery<IVisiblityResponse>({
                query: queries.getVisibility,
            })
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                map(result => result.data && result.data.visibility && result.data.visibility.current),
            )
            .subscribe(current => {
                console.log('%c ***** visibility *****', 'background: orange; color: #000; font-weight: bold', current);
                this.visible = current;
            });
    }

    public logout = () => {
        this.authService.logout()
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
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
