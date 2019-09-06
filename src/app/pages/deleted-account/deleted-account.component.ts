import {
    Component,
    OnInit,
} from '@angular/core';

import { Apollo } from 'apollo-angular';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ApolloService } from 'src/app/services/apollo-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: './deleted-account.component.html',
})
export class DeletedAccountComponent extends AbstractComponent implements OnInit {

    constructor(
        private apollo: Apollo,
        private apolloService: ApolloService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.authService.logout()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.apolloService.resetStore();
                });
    }
}
