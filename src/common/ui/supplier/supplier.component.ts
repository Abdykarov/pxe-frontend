import {
    Component,
    Input,
} from '@angular/core';

import {
    ISupplier,
    TypeCommodity,
} from './model/supplier.model';

@Component({
    selector: 'pxe-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent {
    @Input()
    public configSupplier: ISupplier[];

    @Input()
    public typeCommodity?: TypeCommodity = TypeCommodity.BOTH;
}
