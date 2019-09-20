import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class SupplierConcludedContractsEmptyComponent {
    public redirectToOffer = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }
}
