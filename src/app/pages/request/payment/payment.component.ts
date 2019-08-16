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
} from 'src/common/utils';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.WAITING_FOR_PAYMENT;

    public configStepper = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public bannerTypeImages = BannerTypeImages;
    public globalError: string[] = [];
    public loading = true;
    public paymentInfo: IPayment;
    public contractStatus = ContractStatus;
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        public navigateRequestService: NavigateRequestService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();
        this.getSupplyPointWithPayment(this.supplyPointId);
        // this.supplyService.findSupplyPoints()
        //     .pipe(
        //         map(({data}) => data.findSupplyPoints),
        //         takeUntil(this.destroy$),
        //     )
        //     .subscribe((data) => {
        //         console.log('%c ***** data *****', 'background: #bada55; color: #000; font-weight: bold', data);
        //     });
    }

    public getSupplyPointWithPayment = (id) => {
        this.supplyService.getSupplyPoint(id)
            .pipe(
                map(({data}) => data.getSupplyPoint),
                switchMap((supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    this.navigateRequestService.checkCorrectStep(this.supplyPoint, ProgressStatus.WAITING_FOR_PAYMENT);
                    const isContractFinalized = this.supplyPoint.contract &&
                        R.indexOf(this.supplyPoint.contract.contractStatus, [
                            ContractStatus.CONCLUDED,
                            ContractStatus.CANCELED,
                            ContractStatus.TO_BE_CANCELED,
                        ]) >= 0;
                    if (isContractFinalized) {
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
                    // TODO check
                    if (firstContract && 0) {
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
                switchMap((changed: boolean) => {
                    console.log('%c ***** changed *****', 'background: #bada55; color: #000; font-weight: bold', changed);
                    if (!R.isEmpty(this.paymentInfo) || changed || 1) {
                        return this.authService.refreshToken( {
                            supplyPointId: this.supplyPoint.id,
                        });
                    }
                    return of({});
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
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

    public createSupplyPoint = () => {
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }
}
