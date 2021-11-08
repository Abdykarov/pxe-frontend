import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { map, takeUntil } from 'rxjs/operators';
import { CONSTS, ROUTES } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { parseGraphQLErrors, scrollToElementFnc } from 'src/common/utils';

@Component({
    selector: 'pxe-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent
    extends AbstractComponent
    implements OnInit
{
    public readonly MAX_SUPPLY_POINTS_OF_RESULT_IN_CANT_DELETE_TEMPLATE = 5;

    public currentUser: IJwtPayload;
    public formLoading = false;
    public fieldError: IFieldError = {};
    public globalError: string[] = [];
    public loading = true;
    public supplyPoints: ISupplyPoint[] = null;
    public smsSent = false;

    public pxeVerificationFormWrapper: ElementRef;

    @ViewChild('pxeVerificationFormWrapper') set content(
        pxeVerificationFormWrapper: ElementRef
    ) {
        if (pxeVerificationFormWrapper) {
            this.pxeVerificationFormWrapper = pxeVerificationFormWrapper;
        }
    }

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private registrationService: RegistrationService,
        private router: Router,
        private supplyService: SupplyService
    ) {
        super();
        this.currentUser = this.authService.currentUserValue;
    }

    ngOnInit() {
        this.supplyService
            .findSupplyPointsByContractStatus([
                ContractStatus.CONCLUDED,
                ContractStatus.WAITING_FOR_PAYMENT,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map(({ data }) => data.findSupplyPointsByContractStatus),
                map(
                    R.pipe(
                        R.sortBy(R.compose(R.toLower, R.prop('name'))),
                        R.uniqBy(R.prop('name'))
                    )
                )
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.supplyPoints = supplyPoints;
                    this.loading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );
    }

    public sendConfirmationSms = () => {
        this.formLoading = true;
        this.registrationService
            .sendUnregisterSms()
            .pipe(
                takeUntil(this.destroy$),
                map(({ data }) => data.sendUnregisterSms)
            )
            .subscribe(
                (result: boolean) => {
                    this.smsSent = true;
                    this.formLoading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.formLoading = false;
                    this.cd.markForCheck();
                }
            );
    };

    public submitVerification = (smsCode: string = null) => {
        this.formLoading = true;
        this.registrationService
            .makeUnregistration(smsCode)
            .pipe(
                takeUntil(this.destroy$),
                map(({ data }) => data.makeUnregistration)
            )
            .subscribe(
                (deletedAccount: boolean) => {
                    if (deletedAccount) {
                        this.router.navigate([CONSTS.PATHS.DELETED_ACCOUNT]);
                    } else {
                        this.globalError = [defaultErrorMessage];
                        this.formLoading = false;
                        this.cd.markForCheck();
                    }
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError, fieldError } =
                        parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    if (Object.keys(this.fieldError).length) {
                        scrollToElementFnc(
                            this.pxeVerificationFormWrapper.nativeElement
                        );
                    }
                    this.cd.markForCheck();
                }
            );
    };

    public redirectToUserProfile = () => {
        this.router.navigate([ROUTES.ROUTER_USER_PROFILE]);
    };

    public redirectToConcludedContract = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    };
}
