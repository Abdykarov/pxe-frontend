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
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import {
    parseGraphQLErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { graphQLMessages } from 'src/common/constants/errors.constant';

@Component({
    selector: 'pxe-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent extends AbstractComponent implements OnInit {
    public readonly MAX_SUPPLY_POINTS_OF_RESULT_IN_CANT_DELETE_TEMPLATE = 5;

    public currentUser: IJwtPayload;
    public formLoading = false;
    public globalError: string[] = [];
    public loading = true;
    public supplyPoints: ISupplyPoint[] = null;
    public smsSent = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private registrationService: RegistrationService,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
        this.currentUser = this.authService.currentUserValue;
    }

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus([
                ContractStatus.CONCLUDED,
                ContractStatus.WAITING_FOR_PAYMENT,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.findSupplyPointsByContractStatus),
                map(R.pipe(
                    R.sortBy(R.compose(R.toLower, R.prop('name'))),
                    R.uniqBy(R.prop('name')),
                )),
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.supplyPoints = supplyPoints;
                    this.loading = false;
                    this.cd.markForCheck();
                },
                error => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public sendConfirmationSms = () => {
        this.loading = true;
        this.registrationService.sendUnregisterSms()
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.sendUnregisterSms),
            )
            .subscribe((result: boolean) => {
                    this.loading = false;
                    if (result) {
                        this.router.navigate([CONSTS.PATHS.DELETED_ACCOUNT]);
                    } else {
                        this.globalError.push(graphQLMessages.cannotSendSms);
                        scrollToElementFnc('top');
                    }
                    this.cd.markForCheck();
                },
                error => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.loading = false;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
        this.smsSent = true;
    }

    public submitVerification = (smsCode: string = null) => {
        this.formLoading = true;
        this.registrationService.makeUnregistration(smsCode)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.makeUnregistration),
            )
            .subscribe(
                (result: boolean) => {
                    this.loading = false;
                    this.formLoading = false;
                    if (result) {
                        this.router.navigate([CONSTS.PATHS.DELETED_ACCOUNT]);
                    } else {
                        // TODO - temporary
                        // TODO check s monikou - konkretni zneni zpravy
                        this.globalError.push(graphQLMessages.cannotUnregistration);
                        scrollToElementFnc('top');
                    }
                    this.cd.markForCheck();
                },
                error => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.loading = false;
                    this.formLoading = false;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public redirectToUserProfile = () => {
        this.router.navigate([ROUTES.ROUTER_USER_PROFILE]);
    }

    public redirectToConcludedContract = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }
}
