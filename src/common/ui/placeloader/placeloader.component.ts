import { Component, Input } from '@angular/core';

@Component({
    selector: 'lnd-placeloader',
    templateUrl: './placeloader.component.html',
    styleUrls: ['./placeloader.component.scss'],
})
export class PlaceloaderComponent {
    @Input()
    public label?: string;

    @Input()
    public loading = false;
}
