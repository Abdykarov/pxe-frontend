import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { configSupplier } from 'src/static/config/suppliers.config';
import { FileUploader } from 'src/third-sides/file-upload';
import { ISupplierLogo } from 'src/common/ui/supplier/model/supplier.model';
import { SupplierComponent } from 'src/common/ui/supplier/supplier.component';

@Component({
    templateUrl: './page.html',
})
export class RegistrationPageComponent {
    @Input()
    public supplierTemplate: TemplateRef<SupplierComponent>;

    public configSupplier: ISupplierLogo[] = configSupplier;

    public fileUploader = new FileUploader({
        url: 'none',
    });

    public submitForm(evt) {
        evt.preventDefault();
        console.log('Submit form');
    }
}
