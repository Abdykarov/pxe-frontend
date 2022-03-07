import { Component, Input } from '@angular/core';
import { ISupplierLogo } from 'src/common/ui/supplier/model/supplier.model';
import { config } from './supplier-container.config';

@Component({
    selector: 'pxe-supplier-container',
    templateUrl: './supplier-container.component.html',
    styleUrls: ['./supplier-container.component.scss'],
})
export class SupplierContainerComponent {
    @Input()
    public config: ISupplierLogo[] = config;
}
