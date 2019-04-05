import { Component } from '@angular/core';

import { config } from './model/coverage.config';
import { IConfig } from './model/coverage.model';

@Component({
    selector: 'lnd-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.css'],
})
export class MapCoverageComponent {
  config: IConfig = config;
}
