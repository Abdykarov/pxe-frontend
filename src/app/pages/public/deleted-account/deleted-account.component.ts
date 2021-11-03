import {Apollo} from 'apollo-angular';
import {
    Component,
    OnInit,
} from '@angular/core';
import { Location } from '@angular/common';



import { AbstractComponent } from 'src/common/abstract.component';
import { ApolloService } from 'src/app/services/apollo.service';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';

@Component({
    templateUrl: './deleted-account.component.html',
})
export class DeletedAccountComponent extends AbstractComponent implements OnInit {

    constructor(
        private apollo: Apollo,
        private apolloService: ApolloService,
        private authService: AuthService,
        private location: Location,
    ) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.location.go(CONSTS.PATHS.EMPTY);
        this.authService.logout()
            .subscribe(
                () => {
                    this.apolloService.resetStore();
                });
    }
}
