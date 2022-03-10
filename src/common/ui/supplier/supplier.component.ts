import { Component, Input } from '@angular/core';
import { ISupplierLogo } from './model/supplier.model';

@Component({
    selector: 'pxe-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
    @Input()
    public configSupplier: ISupplierLogo[];
}
