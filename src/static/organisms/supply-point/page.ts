import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
  styleUrls: ['../../../common/ui/supply-point/supply-point.component.scss'], // smazat po vytvoreni UI komponenty
})

export class SupplyPointComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
}
