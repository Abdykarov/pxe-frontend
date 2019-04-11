import {
    Component,
    Input,
} from '@angular/core';

import { IMapCoverageConfig } from './model/coverage.model';

@Component({
    selector: 'pxe-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.scss'],
})
export class MapCoverageComponent {
  @Input()
  public config: IMapCoverageConfig;
}
