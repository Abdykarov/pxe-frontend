import { Component } from '@angular/core';

import {
    configCoverage,
    configSuppliers,
} from './map-coverage-container.config';
import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

@Component({
    selector: 'pxe-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.scss'],
})
export class MapCoverageContainerComponent {
    public configCoverage: IMapCoverageConfig = configCoverage;
    public configSupplier: ISupplier[] = configSuppliers;
}
