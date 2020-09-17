import {
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'pxe-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.scss'],
})
export class MapCoverageContainerComponent {

    @ViewChild('pxeMapCoverageWrapper', { static: true })
    public pxeMapCoverageWrapper: ElementRef;

}
