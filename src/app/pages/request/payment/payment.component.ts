import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import {
    ContractStatus,
    IPayment,
} from 'src/common/graphql/models/contract';
import {
    getConfigStepper,
    parseGraphQLErrors,
    removeAccent,
} from 'src/common/utils';
import {
    GTM_CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { GTMService } from 'src/app/services/gtm.service';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

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
        private gtmService: GTMService,
        public navigateRequestService: NavigateRequestService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
        this.gtmService.loadFormEvent(GTM_CONSTS.LABELS.STEP_THREE, this.authService.hashedUserId);
    }

    ngOnInit () {
        super.ngOnInit();
        this.getSupplyPointWithPayment(this.supplyPointId);
    }

    public getSupplyPointWithPayment = (id) => {
        this.supplyService.getSupplyPoint(id)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;

                    this.gtmService.pushEvent({
                        event: GTM_CONSTS.EVENTS.CHECKOUT,
                        ecommerce: {
                            actionField: {
                                step: 3,
                            },
                            products: [{
                                name: removeAccent(this.supplyPoint?.supplier?.name).toLowerCase(),
                                id: this.supplyPoint?.supplier?.id,
                                brand: GTM_CONSTS.BRAND,
                                quantity: 1,
                            }],
                        },
                    });

                    this.navigateRequestService.checkCorrectStep(this.supplyPoint, ProgressStatus.WAITING_FOR_PAYMENT);
                    this.isContractFinalized = this.supplyPoint.contract &&
                        R.indexOf(this.supplyPoint.contract.contractStatus, [
                            ContractStatus.CONCLUDED,
                            ContractStatus.CANCELED,
                            ContractStatus.TO_BE_CANCELED,
                        ]) >= 0;
                    if (this.isContractFinalized) {
                        this.finalizePaymentProgress();
                    }
                    if (this.supplyPoint.contract && this.supplyPoint.contract.contractStatus === ContractStatus.WAITING_FOR_PAYMENT &&
                        this.supplyPoint.contract.contractId) {
                            return this.contractService.getPaymentInfo(this.supplyPoint.contract.contractId);
                    } else {
                        return of({
                            data: {
                                getPaymentInfo: {},
                            },
                        });
                    }
                }),
                map(({data}) => data.getPaymentInfo),
                switchMap((paymentInfo: IPayment) => {
                    const firstContract = this.authService.currentUserValue.firstContract;
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
                map(({data}) => data.confirmFirstContractView),
                switchMap((firstContractChanged: boolean) => {
                    if (!R.isEmpty(this.paymentInfo) || firstContractChanged) {
                        return this.authService.refreshToken();
                    }
                    return of({});
                }),
                switchMap(() => {
                    if (this.supplyPoint.contract && this.supplyPoint.contract.contractStatus === ContractStatus.TO_BE_CANCELED) {
                        return this.supplyService.findSupplyPointsByContractStatus(
                            [
                                ContractStatus.NOT_CONCLUDED,
                            ],
                            this.supplyPoint.identificationNumber,
                        );
                    }
                    return of({
                        data: {
                            findSupplyPointsByContractStatus: [],
                        },
                    });
                }),
                map(({data}) => R.head(data.findSupplyPointsByContractStatus)),
                takeUntil(this.destroy$),
            )
            .subscribe(
                (supplyPointNewVersion: ISupplyPoint) => {
                    this.gtmService.pushEvent({
                        'event': GTM_CONSTS.EVENTS.EVENT_TRACKING,
                        'category': GTM_CONSTS.CATEGORIES.FORM,
                        'dodavatel': removeAccent(this.supplyPoint?.supplier?.name).toLowerCase(),
                        'action': GTM_CONSTS.ACTIONS.SIGNED,
                        'label': GTM_CONSTS.LABELS.STEP_THREE,
                        'userID': this.authService.hashUserId,
                    });
                    this.supplyPointNewVersion = supplyPointNewVersion;
                    this.loading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public finalizePaymentProgress = () => {
        this.configStepper = getConfigStepper(ProgressStatus.COMPLETED);
    }

    public navigateToRequest = (supplyPoint: ISupplyPoint) => {
        if (supplyPoint) {
            this.navigateRequestService.routerToRequestStep(supplyPoint);
        } else {
            this.router.navigate([ROUTES.ROUTER_REQUEST_SIGNBOARD]);
        }
    }

    public navigateToContracts = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }
}
