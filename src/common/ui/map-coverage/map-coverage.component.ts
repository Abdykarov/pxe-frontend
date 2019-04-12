import {
    Component,
    Input,
} from '@angular/core';

import { IMapCoverageConfig } from './model/coverage.model';
import { RESULT_TYPE_CONSUMPTION } from 'src/common/pipes/consumption/model/consumption-model';

@Component({
    selector: 'pxe-map-coverage',
    templateUrl: './map-coverage.component.html',
    styleUrls: ['./map-coverage.component.scss'],
})
export class MapCoverageComponent {
    @Input()
    public config: IMapCoverageConfig;

    public RESULT_TYPE_CONSUMPTION_UNIT: RESULT_TYPE_CONSUMPTION = RESULT_TYPE_CONSUMPTION.UNIT;
    public RESULT_TYPE_CONSUMPTION_VALUE: RESULT_TYPE_CONSUMPTION = RESULT_TYPE_CONSUMPTION.VALUE;
}
