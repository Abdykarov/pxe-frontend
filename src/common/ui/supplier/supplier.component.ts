import {
    Component,
    Input,
} from '@angular/core';
import { ISupplier } from './model/supplier';

@Component({
    selector: 'pxe-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
    @Input()
    public config: ISupplier[];
}
