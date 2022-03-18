import { Component, Input, TemplateRef } from '@angular/core';
import { ISupplierLogo } from 'src/common/ui/supplier/model/supplier.model';
import { SupplierComponent } from 'src/common/ui/supplier/supplier.component';
import { configSupplier } from 'src/static/config/suppliers.config';

@Component({
    templateUrl: './page.html',
})
export class LoginPageComponent {
    @Input()
    public supplierTemplate: TemplateRef<SupplierComponent>;

    public configSupplier: ISupplierLogo[] = configSupplier;

    submitForm(evt) {
        evt.preventDefault();
        console.log('Submit form');
    }

    public action = (evt) => {
        evt.preventDefault();
        window.open('/forgotten-password');
    };
}
