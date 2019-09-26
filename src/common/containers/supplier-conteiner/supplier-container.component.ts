import {
    Component,
    Input,
} from '@angular/core';

import { config } from './supplier-container.config';
import {
    ISupplierLogo,
    TypeCommodity,
} from 'src/common/ui/supplier/model/supplier.model';

@Component({
    selector: 'pxe-supplier-container',
    templateUrl: './supplier-container.component.html',
    styleUrls: ['./supplier-container.component.scss'],
})
export class SupplierContainerComponent {
    @Input()
    public config: ISupplierLogo[] = config;

    @Input()
    public  typeCommodity?: TypeCommodity = TypeCommodity.BOTH;
}
