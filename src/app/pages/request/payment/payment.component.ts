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
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public configStepper = getConfigStepper(ProgressStatus.WAITING_FOR_PAYMENT);
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
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
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
                    const isContractFinalized = this.supplyPoint.contract &&
                        R.indexOf(this.supplyPoint.contract.contractStatus, [ContractStatus.CONCLUDED, ContractStatus.CANCELED]) >= 0;
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
                    if (!R.isEmpty(paymentInfo)) {
                        this.paymentInfo = paymentInfo;
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
