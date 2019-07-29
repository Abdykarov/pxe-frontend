import { Component } from '@angular/core';

import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { newsConfig } from 'src/static/config/news-config';
import { supplyPointsEndingConfig } from 'src/static/pages/dashboard/config';

@Component({
  templateUrl: './page.html',
})

export class DashboardComponent {

    public electricityPlacesCount = 2;
    public electricitySumOfPerformance = 1.002;
    public gasPlacesCount = 3;
    public gasSumOfPerformance = 4.784;
    public news = newsConfig;
    public supplyPointsEnding: ISupplyPoint[] = supplyPointsEndingConfig;

    newSupplyPointAction = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
