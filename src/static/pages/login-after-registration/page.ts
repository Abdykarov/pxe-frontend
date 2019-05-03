import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { configSupplier } from 'src/static/config/suppliers.config';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';
import { SupplierComponent } from 'src/common/ui/supplier/supplier.component';

@Component({
    templateUrl: './page.html',
})
export class LoginAfterRegistrationPageComponent {
    @Input()
    public supplierTemplate: TemplateRef<SupplierComponent>;

    public configSupplier: ISupplier[] = configSupplier;

    public submitForm = () => alert('Form submitted');

    public action = () => alert('Email send');
}
