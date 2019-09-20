import { Component } from '@angular/core';

import { SupplierConcludedContractsConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplierConcludedContractsComponent {
    public readonly ITEMS_PER_PAGE = 20;
    public readonly MAX_SIZE = 5;
    public readonly SHOW_BOUNDARY_LINKS = true;

    public supplyPoint: any[] = this.supplierConcludedContractsConfig.supplyPointsSource;
    public totalItems = this.supplierConcludedContractsConfig.supplyPointsSource.length;
    public tableCols = this.supplierConcludedContractsConfig.tableCols;

    constructor(
        private supplierConcludedContractsConfig: SupplierConcludedContractsConfig,
    ) {}

    public pageChanged = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }

    public downloadPDF = (contractId) => {
        console.log('Stahuji');
    }
}
