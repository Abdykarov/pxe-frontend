import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractComponent } from 'src/common/abstract.component';
import { NewsService } from 'src/common/cms/services/news.service';
import {
    ISupplyPointStatistic,
    ISupplyPointStatisticView,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';
import { SupplyPointUtilsService } from 'src/common/services/supply-point-utils.service';
import { parseGraphQLErrors } from 'src/common/utils';

@Component({
    selector: 'pxe-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public loadingData = true;
    public supplyPointStatistic: ISupplyPointStatistic;
    public ProgressStatus = ProgressStatus;

    public news$ = this.newsService.getNews();

    constructor(
        private cd: ChangeDetectorRef,
        public navigateConsumerService: NavigateConsumerService,
        private newsService: NewsService,
        private router: Router,
        private supplyService: SupplyService,
        public supplyPointUtilsService: SupplyPointUtilsService
    ) {
        super();
    }

    ngOnInit() {
        this.supplyService
            .computeAndGetSupplyPointStatistics()
            .pipe(
                takeUntil(this.destroy$),
                map(({ data }) => data.computeAndGetSupplyPointStatistics)
            )
            .subscribe(
                (supplyPointStatistic: ISupplyPointStatistic) => {
                    this.loadingData = false;
                    this.supplyPointStatistic = supplyPointStatistic;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );
    }

    public supplierAction = (
        showDeliveryItems: ISupplyPointStatisticView[]
    ) => {
        R.cond([
            [
                (items: ISupplyPointStatisticView[]) =>
                    R.equals(1, items.length),
                (items: ISupplyPointStatisticView[]) => {
                    const supplyPointId = items[0].id;
                    this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                        ProgressStatus.SUPPLY_POINT,
                        null,
                        {
                            supplyPointId,
                        }
                    );
                },
            ],
            [R.T, () => this.navigateConsumerService.navigateToSupplyPoints()],
        ])(showDeliveryItems);
    };
}
