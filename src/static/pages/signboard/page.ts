import { Component } from '@angular/core';
import { TypeOfList } from 'src/common/ui/list-of-notifications/models/list-of-notifications.model';

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
