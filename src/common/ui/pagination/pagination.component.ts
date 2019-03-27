import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import * as R from 'ramda';

// own models
import { defaultPerPageConfig } from './models/per-page.config';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { IPagination } from './models/pagination.model';

@Component({
    selector: 'lnd-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
    @Input()
    public allItems: number;

    @Input()
    public hasOptions = false;

    @Input()
    public label: string;

    @Input()
    public optionsLabel?: string;

    @Input()
    public pageSize?: number;

    @Output()
    public perPageChange: EventEmitter<any> = new EventEmitter();

    public defaultPage = 1;

    public pagination: IPagination;

    public perPageOptions?: IOption[];

    public prevDots = false;

    public nextDots = false;

    constructor() {}

    ngOnInit() {
        if (this.hasOptions) {
            this.perPageOptions = R.clone(defaultPerPageConfig);
            this.pageSize = defaultPerPageConfig[0].key;
        }
        this.setPage(this.defaultPage);
    }

    changePerPage(value: number) {
        this.pageSize = value;
        this.perPageChange.emit(value);
        this.setPage(this.defaultPage);
    }

    setPage(page: number) {
        this.pagination = this.getPagination(this.allItems, page, this.pageSize);
    }

    setPages = (startPage: number, endPage: number) =>
        Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i)

    getPagination(totalItems: number, activePage: number, pageSize: number) {
        const totalPages = Math.ceil(totalItems / pageSize);
        const isLarger = totalPages > 9;
        let pages = [];

        if ( !isLarger ) {
            pages = this.setPages(1, totalPages);
            this.prevDots = false;
            this.nextDots = false;
        } else if ( isLarger && activePage < 6 ) {
            pages = this.setPages(1, 7);
            this.prevDots = false;
            this.nextDots = true;
        } else if ( isLarger && activePage > 5 && activePage > ( totalPages - 5 ) ) {
            pages = this.setPages(totalPages - 6, totalPages);
            this.prevDots = true;
            this.nextDots = false;
        } else {
            pages = this.setPages(activePage - 2, activePage + 2);
            this.prevDots = true;
            this.nextDots = true;
        }

        return {
            activePage: activePage,
            pageSize: pageSize,
            totalPages: totalPages,
            pages: pages,
        };
    }
}
