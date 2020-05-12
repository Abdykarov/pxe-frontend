import { Component } from '@angular/core';
import { TypeOfList } from 'src/common/ui/list-of-notifications/models/list-of-notifications.model';

import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';

@Component({
  templateUrl: './page.html',
})

export class SignboardComponent {
    public notifications = [
        'Fakturu se současným dodavatelem (jedno jakého data).',
        'Ověřte způsob výpovědi vaší smlouvy, v případě, že si nebude jistí zanechte přednastavenou hodnotu.',
        'Pro uzavření smlouvy budete potřebovat váš mobilní telefon.',
    ];
    public typeOfListCheck = TypeOfList.CHECKLIST;

    constructor(
        public config: NewSupplyPointPageConfig,
    ) {}

    public click = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
