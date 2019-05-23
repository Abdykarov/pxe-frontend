import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';
import {
    SupplyOfferOrganismConfig,

} from './config';

@Component({
    templateUrl: './page.html',
})

export class SupplyOfferComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

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
    });

    constructor(
        public supplyOfferConfig: SupplyOfferOrganismConfig,
        public newSupplyPointPageConfig: NewSupplyPointPageConfig,
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply offer',
                url: null,
            },
        ];
    }

    public edit = (table, row) => {
        console.log('%c ***** edit *****', 'background: #bada55; color: #000; font-weight: bold', row);
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public create = (table, row) => {
        console.log('%c ***** create *****', 'background: #bada55; color: #000; font-weight: bold', row, table.rowOpened);
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public duplicate = (table, row) => {
        console.log('%c ***** duplicate *****', 'background: #bada55; color: #000; font-weight: bold', row, table.rowOpened);
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public delete = (table, row) => {
        console.log('%c ***** delete *****', 'background: #bada55; color: #000; font-weight: bold', row, table.rowOpened);
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public rowOpened = (row) => {
        console.log('%c ***** rowOpened *****', 'background: #bada55; color: #000; font-weight: bold', row);
    }

    public rowSelected = (row) => {
        console.log('%c ***** rowSelected *****', 'background: #bada55; color: #000; font-weight: bold', row);
    }
}
