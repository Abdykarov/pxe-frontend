import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'pxe-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent extends AbstractComponent implements OnInit {
    public canBeDeletedAccount = null;
    public globalError: string[] = [];
    public loading = true;
    public supplyPoints: ISupplyPoint[] = null;
    public smsSent = false;
    public currentUser: IJwtPayload;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        public router: Router,
        private supplyService: SupplyService,
    ) {
        super();
        this.currentUser = this.authService.currentUserValue;
    }

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus(null,
            [
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.findSupplyPointsByContractStatus),
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.supplyPoints = supplyPoints;
                    this.loading = false;
                    this.canBeDeletedAccount = supplyPoints.length === 0;
                    this.cd.markForCheck();
                },
                error => {
                    this.loading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public sendConfirmationSms = () => {
        this.smsSent = true;
    }

    public cancelAccountAction = (smsCode: string) => {
    }

    public redirectToUserProfile = () => {
        this.router.navigate([ROUTES.ROUTER_USER_PROFILE]);
    }

    public redirectToConcludedContract = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }
}
