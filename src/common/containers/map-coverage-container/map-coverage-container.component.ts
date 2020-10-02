import {
    Component,
    ElementRef, Input,
    ViewChild,
} from '@angular/core';

import { IMapCoverage } from 'src/common/cms/models/landing-page';

@Component({
    selector: 'pxe-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.scss'],
})
export class MapCoverageContainerComponent {

    @ViewChild('pxeMapCoverageWrapper', { static: true })
    public pxeMapCoverageWrapper: ElementRef;

    @Input()
    public mapCoverage: IMapCoverage;
}
