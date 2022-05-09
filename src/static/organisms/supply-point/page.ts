import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { supplyPointConfigGas, supplyPointConfigPower } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply point',
                url: null,
            },
        ];
    }

    public supplyPointPower = supplyPointConfigPower;
    public supplyPointGas = supplyPointConfigGas;
}
