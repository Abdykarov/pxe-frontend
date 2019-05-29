import { Component } from '@angular/core';

import { ContractSigningPageConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class ContractSigningPageComponent {
    constructor(
        public config: ContractSigningPageConfig,
    ) {}
}
