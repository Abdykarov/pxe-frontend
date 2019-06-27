import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    supplyPointConfig,
    supplyPointConfig2,
} from './config';

@Component({
  templateUrl: './page.html',
})

export class RequestCardComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public supplyPoint = supplyPointConfig;
    public supplyPoint2 = supplyPointConfig2;

    public submitForm() {
        console.log('CLICKED');
    }

    constructor(
      ) {
          this.breadcrumbItemsSimple = [
              {
                  label: 'Request card',
                  url: null,
              },
          ];
      }
}
