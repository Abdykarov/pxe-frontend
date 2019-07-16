import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { getConfigStepper, parseGraphQLErrors } from 'src/common/utils';
import { ISupplyPoint, ProgressStatus } from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { PaymentState } from 'src/app/pages/request/payment/models/payment.model';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ContractStatus } from 'src/common/graphql/models/contract';

@Component({
    selector: 'pxe-contract',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent extends AbstractComponent implements OnInit {
    public configStepper = getConfigStepper(ProgressStatus.WAITING_FOR_PAYMENT);
    public bannerTypeImages = BannerTypeImages;
    public globalError: string[] = [];
    public paymentState = PaymentState;
    public loading = true;
    public showPaymentInfo = true;
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
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
        if (this.supplyPointId) {
            this.getSupplyPoint(this.supplyPointId);
        } else {
            // TODO - get last WAITING_FOR_PAYMENT contract id
        }
    }

    public getSupplyPoint = (id) => {
        this.supplyService.getSupplyPoint(id)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.getSupplyPoint),
            )
            .subscribe(
                (supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    if (this.supplyPoint.contract && this.supplyPoint.contract.contractStatus === ContractStatus.CONCLUDED) {
                        this.finalizePayment();
                    }
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

    public togglePaymentInfo = () => {
        this.showPaymentInfo = !this.showPaymentInfo;
    }

    public finalizePayment = () => {
        // TODO
        this.configStepper = getConfigStepper(ProgressStatus.COMPLETED);
    }
}
