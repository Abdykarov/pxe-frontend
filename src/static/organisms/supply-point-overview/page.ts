import { Component } from '@angular/core';
import { ISupplyPointStatistic } from 'src/common/graphql/models/supply.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    supplyPointStatistic,
    supplyPointStatisticMore,
    supplyPointStatisticNone,
} from 'src/static/pages/dashboard/config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointOverviewComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public supplyPointStatistic: ISupplyPointStatistic = supplyPointStatistic;
    public supplyPointStatisticMore: ISupplyPointStatistic =
        supplyPointStatisticMore;
    public supplyPointStatisticNone: ISupplyPointStatistic =
        supplyPointStatisticNone;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply point overview',
                url: null,
            },
        ];
    }
}
