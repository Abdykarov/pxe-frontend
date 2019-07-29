import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { supplyPointsEndingConfig } from 'src/static/pages/dashboard/config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointOverviewComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public electricityPlacesCount = 2;
    public electricitySumOfPerformance = 1.002;
    public gasPlacesCount = 3;
    public gasSumOfPerformance = 4.784;

    public supplyPointsEnding: ISupplyPoint[] = supplyPointsEndingConfig;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply point overview',
                url: null,
            },
        ];
    }
}
