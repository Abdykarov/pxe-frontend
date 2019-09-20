import { Component } from '@angular/core';

import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { tableCols } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplierConcludedContractsComponent {
    public readonly ITEMS_PER_PAGE = 50;
    public readonly MAX_SIZE = 5;
    public readonly SHOW_BOUNDARY_LINKS = true;

    public supplyPoint: ISupplyPoint[] = [];
    public totalItems = 1108;
    public tableCols = tableCols;

    public pageChanged = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }

    public downloadPDF = (contractId) => {
        console.log('Stahuji');
    }

    public redirectToOffer = (evt) => {
        evt.preventDefault();
    }
}
