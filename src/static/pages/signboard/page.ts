import { Component } from '@angular/core';

import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';

@Component({
  templateUrl: './page.html',
})

export class SignboardComponent {
    constructor(
        public config: NewSupplyPointPageConfig,
    ) {}

    public click = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
