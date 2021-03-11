import { Component } from '@angular/core';

import { ISupplyPointStatistic } from 'src/common/graphql/models/supply.model';
import { newsConfig } from 'src/static/config/news-config';
import { supplyPointStatistic } from 'src/static/pages/dashboard/config';

@Component({
  templateUrl: './page.html',
})

export class DashboardComponent {
    public news = newsConfig.news;
    public supplyPointStatistic: ISupplyPointStatistic = supplyPointStatistic;
}
