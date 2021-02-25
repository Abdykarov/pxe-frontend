import {
    Component,
    OnDestroy,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-price-form',
    templateUrl: './prices-form.component.html',
    styleUrls: ['./prices-form.component.scss'],
})
export class PricesFormComponent extends AbstractFormComponent implements OnDestroy {


    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnDestroy() {
        super.ngOnInit();
    }
}
