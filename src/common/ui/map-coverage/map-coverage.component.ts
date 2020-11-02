import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { SupplierComponent } from '../supplier/supplier.component';

@Component({
    selector: 'pxe-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.scss'],
})
export class MapCoverageComponent {

    @Input()
    public supplierTemplate: TemplateRef<SupplierComponent>;

}
