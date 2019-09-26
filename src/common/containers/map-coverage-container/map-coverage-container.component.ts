import { Component } from '@angular/core';

import { configCoverage } from './map-coverage-container.config';
import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';

@Component({
    selector: 'pxe-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.scss'],
})
export class MapCoverageContainerComponent {
    public configCoverage: IMapCoverageConfig = configCoverage;
}