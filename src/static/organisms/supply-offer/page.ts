import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';
import { SupplyOfferOrganismConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplyOfferComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public commodityType = CommodityType.POWER;
    public form: FormGroup = new FormGroup({
        distributionLocation: new FormControl(),
        distributionRateId: new FormControl(),
        circuitBreakerId: new FormControl(),
        deliveryLength: new FormControl(),
        subjectTypeId: new FormControl(),
        annualConsumptionId: new FormControl(),
        validFrom: new FormControl(),
        validTo: new FormControl(),
        validFromTo: new FormControl(),
        deliveryFrom: new FormControl(),
        deliveryTo: new FormControl(),
        deliveryFromTo: new FormControl(),
        greenEnergy: new FormControl(),
    });

    constructor(
        public newSupplyPointPageConfig: NewSupplyPointPageConfig,
        public supplyOfferConfig: SupplyOfferOrganismConfig
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply offer',
                url: null,
            },
        ];
    }

    public action = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    };

    public click = (evt) => {
        evt.preventDefault();
        console.log('click');
    };
}
