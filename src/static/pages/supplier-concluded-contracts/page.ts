import { Component } from '@angular/core';

import { IPaginationConfig } from 'src/app/pages/suppliers/concluded-contracts/concluded-contracts.model';
import { IPaginatedContractsWithNameAndSupplyPoint } from 'src/common/graphql/models/suppplier.model';
import { SupplierConcludedContractsConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplierConcludedContractsComponent {
    public paginationConfig: IPaginationConfig = this.supplierConcludedContractsConfig.paginationConfig;

    public paginatedContractsWithNameAndSupplyPointEan: IPaginatedContractsWithNameAndSupplyPoint =
        this.supplierConcludedContractsConfig.paginatedContractsWithNameAndSupplyPointEan;

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
