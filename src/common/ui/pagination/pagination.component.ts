import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap';
import { paginationConfig } from 'src/common/ui/pagination/pagination.config';

@Component({
    selector: 'lnd-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent {
    @Input()
    public itemsPerPage = paginationConfig.itemsPerPage;

    @Input()
    public showBoundaryLinks = paginationConfig.showBoundaryLinks;

    @Input()
    public maxSize = paginationConfig.maxSize;

    @Input()
    public totalItems = paginationConfig.totalItems;

    @Input()
    public firstText = paginationConfig.firstText;

    @Input()
    public previousText = paginationConfig.previousText;

    @Input()
    public nextText = paginationConfig.nextText;

    @Input()
    public lastText = paginationConfig.lastText;

    @Output()
    public pageChanged: EventEmitter<PageChangedEvent> = new EventEmitter();
}
