import { Component, Input } from '@angular/core';

import { IConfig } from './coverage.model';

@Component({
    selector: 'lnd-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.css'],
})
export class MapCoverageComponent {
  @Input()
  config: IConfig;
}
