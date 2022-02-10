import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { GTM_CONSTS } from 'src/app/app.constants';
import { AbstractComponent } from 'src/common/abstract.component';
import { ContractStatus, IPayment } from 'src/common/graphql/models/contract';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { AuthService } from 'src/common/services/auth.service';
import { CryptoService } from 'src/common/services/crypto.service';
import { GTMService } from 'src/common/services/gtm.service';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';
import { OAuthService } from 'src/common/services/o-auth.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { getConfigStepper, parseGraphQLErrors } from 'src/common/utils';
import { removeAccent } from 'src/common/utils/standalone/remove-accent.fnc';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.WAITING_FOR_PAYMENT;

    public bannerTypeImages = BannerTypeImages;
    public configStepper = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public contractStatus = ContractStatus;
    public globalError: string[] = [];
    public isContractFinalized = false;
    public loading = true;
    public paymentInfo: IPayment;
    public supplyPoint: ISupplyPoint;
    public supplyPointNewVersion: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private cryptoService: CryptoService,
        private gtmService: GTMService,
        public navigateConsumerService: NavigateConsumerService,
        private oAuthService: OAuthService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.getSupplyPointWithPayment(this.supplyPointId);
    }

    public verifyByBankId = () =>
        this.oAuthService.tryVerifyAccount(this.supplyPointId);

    public getSupplyPointWithPayment = (id) => {
        this.supplyService
            .getSupplyPoint(id)
            .pipe(
                map(({ data }) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;

                    this.gtmService.pushEvent({
                        event: GTM_CONSTS.EVENTS.PURCHASE,
                        ecommerce: {
                            purchase: {
                                actionField: {
                                    revenue:
                                        this.supplyPoint?.contract?.personalData
                                            ?.deposit,
                                    id: this.supplyPoint?.contract?.contractId,
                                },
                                products: [
                                    {
                                        name: removeAccent(
                                            this.supplyPoint?.contract?.offer
                                                ?.supplier?.name
                                        ).toLowerCase(),
                                        id: this.supplyPoint?.contract?.offer?.name?.toLocaleLowerCase(),
                                        brand: GTM_CONSTS.BRAND,
                                        quantity: 1,
                                    },
                                ],
                            },
                        },
                        userID: this.cryptoService?.hashedUserId,
                    });

                    this.navigateConsumerService.checkCorrectStep(
                        this.supplyPoint,
                        ProgressStatus.WAITING_FOR_PAYMENT
                    );
                    this.isContractFinalized =
                        this.supplyPoint.contract &&
                        R.indexOf(this.supplyPoint.contract.contractStatus, [
                            ContractStatus.CONCLUDED,
                            ContractStatus.CANCELED,
                            ContractStatus.TO_BE_CANCELED,
                        ]) >= 0;
                    if (this.isContractFinalized) {
                        this.finalizePaymentProgress();
                    }
                    if (
                        this.supplyPoint.contract &&
                        this.supplyPoint.contract.contractStatus ===
                            ContractStatus.WAITING_FOR_PAYMENT &&
                        this.supplyPoint.contract.contractId
                    ) {
                        return this.contractService.getPaymentInfo(
                            this.supplyPoint.contract.contractId
                        );
                    } else {
                        return of({
                            data: {
                                getPaymentInfo: {},
                            },
                        });
                    }
                }),
                map(({ data }) => data.getPaymentInfo),
                switchMap((paymentInfo: IPayment) => {
                    const firstContract =
                        this.authService.currentUserValue.firstContract;
                    this.paymentInfo = paymentInfo;
                    if (firstContract && this.isContractFinalized) {
                        return this.contractService.confirmFirstContractView();
                    } else {
                        return of({
                            data: {
                                confirmFirstContractView: false,
                            },
                        });
                    }
                }),
                map(({ data }) => data.confirmFirstContractView),
                switchMap((firstContractChanged: boolean) => {
                    if (!R.isEmpty(this.paymentInfo) || firstContractChanged) {
                        return this.authService.refreshToken();
                    }
                    return of({});
                }),
                switchMap(() => {
                    if (
                        this.supplyPoint.contract &&
                        this.supplyPoint.contract.contractStatus ===
                            ContractStatus.TO_BE_CANCELED
                    ) {
                        return this.supplyService.findSupplyPointsByContractStatus(
                            [ContractStatus.NOT_CONCLUDED],
                            this.supplyPoint.identificationNumber,
                            true
                        );
                    }
                    return of({
                        data: {
                            findSupplyPointsByContractStatus: [],
                        },
                    });
                }),
                map(({ data }) =>
                    R.head(data.findSupplyPointsByContractStatus)
                ),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (supplyPointNewVersion: ISupplyPoint) => {
                    const oAuthError = this.oAuthService.getError(
                        this.route.snapshot.queryParams.error
                    );
                    if (oAuthError) {
                        setTimeout((_) => {
                            this.globalError = [oAuthError];
                            this.cd.detectChanges();
                        });
                    }
                    this.gtmService.pushEvent({
                        event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
                        category: GTM_CONSTS.CATEGORIES.FORM,
                        dodavatel: removeAccent(
                            this.supplyPoint?.contract?.offer?.supplier?.name
                        ).toLowerCase(),
                        action: GTM_CONSTS.ACTIONS.SIGNED,
                        label: GTM_CONSTS.LABELS.STEP_SIX,
                        userID: this.cryptoService.hashedUserId,
                    });
                    this.supplyPointNewVersion = supplyPointNewVersion;
                    this.loading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );
    };

    public finalizePaymentProgress = () => {
        this.configStepper = getConfigStepper(ProgressStatus.COMPLETED);
    };

    public navigateToRequest = (supplyPoint: ISupplyPoint) => {
        if (supplyPoint) {
            this.navigateConsumerService.routerToRequestStep(supplyPoint);
        } else {
            this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                ProgressStatus.SIGNBOARD
            );
        }
    };
}
