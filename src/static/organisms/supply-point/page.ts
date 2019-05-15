import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { supplyPointConfig } from './config';

@Component({
  templateUrl: './page.html',
})

export class SupplyPointComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public supplyPoint = supplyPointConfig;
}
