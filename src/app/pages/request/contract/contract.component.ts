import { Component } from '@angular/core';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent {
    constructor() {
        console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold');
    }
}
