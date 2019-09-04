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
import { DeleteAccountState } from 'src/app/pages/delete-account/delete-account.model';
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
    // doresit reduktanci
    public canBeDeletedAccount = null;
    public globalError: string[] = [];
    public loading = true;
    public state: DeleteAccountState = DeleteAccountState.NOT_LOADED;
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
                // overit
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
                    this.state = supplyPoints.length === 0 ?
                        DeleteAccountState.WITH_CONCLUDED_CONTRACT :  DeleteAccountState.WITHOUT_CONCLUDED_CONTRACT;
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

    public submitVerification = (smsCode: string) => {
        this.loading = true;
        this.globalError = [];
        this.cd.markForCheck();
    }

    public cancelAccountAction = () => {
    }

    public backAction = () => {
        this.router.navigate([ROUTES.ROUTER_USER_PROFILE]);
    }

    public checkContractsAction = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }
}
