import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { configSupplier } from 'src/static/config/suppliers.config';
import { SupplierComponent } from 'src/common/ui/supplier/supplier.component';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

@Component({
    templateUrl: './page.html',
})
export class LoginAfterRegistrationPageComponent {
    @Input()
    public supplierTemplate: TemplateRef<SupplierComponent>;

    public configSupplier: ISupplier[] = configSupplier;

    submitForm(evt) {
        evt.preventDefault();
        console.log('Submit form');
    }

    public action = (evt) => {
        evt.preventDefault();
        window.open('/send-email-again');
    }
}
