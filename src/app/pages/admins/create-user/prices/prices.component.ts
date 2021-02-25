import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import {formFields} from 'src/common/containers/form/forms/prices/prices-form.config';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss'],
})
export class PricesComponent extends AbstractComponent {
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];

    constructor() {
        super();
    }
}
