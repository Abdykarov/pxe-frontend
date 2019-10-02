import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { IMapCoverageConfig } from './model/coverage.model';
import { SupplierComponent } from '../supplier/supplier.component';

@Component({
    selector: 'pxe-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.scss'],
})
export class MapCoverageComponent {

    @Input()
    public configCoverage: IMapCoverageConfig;

    @Input()
    public supplierTemplateGas: TemplateRef<SupplierComponent>;

    @Input()
    public supplierTemplatePower: TemplateRef<SupplierComponent>;

}
