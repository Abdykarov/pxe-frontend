import { Component, Input } from '@angular/core';

import { IConfig } from './model/coverage.model';

@Component({
    selector: 'pxe-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.css'],
})
export class MapCoverageComponent {
  @Input()
  config: IConfig;
}
