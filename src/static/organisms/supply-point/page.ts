import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
  // styleUrls: ['src/common/ui/supply-point/supply-point.component.scss'],
  styleUrls: ['../../../common/ui/supply-point/supply-point.component.scss'],
})

export class SupplyPointComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
}
