import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'pxe-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent extends AbstractComponent implements OnInit {
    public readonly MAX_SUPPLY_POINTS_OF_RESULT_IN_CANT_DELETE_TEMPLATE = 5;

    public currentUser: IJwtPayload;
    public globalError: string[] = [];
    public loading = true;
    public supplyPoints: ISupplyPoint[] = null;
    public smsSent = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
        this.currentUser = this.authService.currentUserValue;
    }

    ngOnInit() {
        if (!this.currentUser.phoneNumber) {
            this.router.navigate([ROUTES.ROUTER_USER_PROFILE]);
        }
        this.supplyService.findSupplyPointsByContractStatus([
                ContractStatus.CONCLUDED,
                ContractStatus.WAITING_FOR_PAYMENT,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.findSupplyPointsByContractStatus),
                map((supplyPoints: ISupplyPoint[]) =>
                    R.pipe(
                        this.sortByNameCaseInsensitive,
                        R.uniqBy(R.prop('name')),
                    )(supplyPoints)),
            )
            .subscribe(
                (supplyPoints: any) => {
                    this.supplyPoints = supplyPoints;
                    this.loading = false;
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

    private sortByNameCaseInsensitive = (supplyPoints: ISupplyPoint[]) => R.sortBy(R.compose(R.toLower, R.prop('name')))(supplyPoints);

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
