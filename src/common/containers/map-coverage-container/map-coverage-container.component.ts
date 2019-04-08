import { Component } from '@angular/core';

import { config } from './coverage.config';
import { IConfig } from 'src/common/ui/map-coverage/coverage.model';

@Component({
    selector: 'lnd-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.css'],
})
export class MapCoverageContainerComponent {
    config: IConfig = config;
}
