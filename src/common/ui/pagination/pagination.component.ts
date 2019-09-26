import {
    Component, EventEmitter,
    Input, Output,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'lnd-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
    @Input()
    public itemsPerPage = 50;

    @Input()
    public showBoundaryLinks = false;

    @Input()
    public maxSize = 5;

    @Input()
    public totalItems = 100;

    @Input()
    public firstText = '';

    @Input()
    public previousText = '';

    @Input()
    public nextText = '';

    @Input()
    public lastText = '';

    @Output()
    public pageChanged: EventEmitter<any> = new EventEmitter();
}
