import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { viewBreakpoints } from 'src/app/constants/breakpoints.constant';
import { AbstractComponent } from 'src/common/abstract.component';
import { isRouterLink } from 'src/common/utils';
import { ITableColumnConfig } from './models/table.model';

@Component({
    selector: 'lnd-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent extends AbstractComponent implements OnChanges {
    @Input() cols: Array<ITableColumnConfig>;
    @Input() rows: Array<any>;

    @Input() caption?: string;
    @Input() mobileDetailCaption?: string;
    @Input() showHead?: boolean;
    @Input() tableWrapperClass?: string;
    @Input() tableClass?: string;
    @Input() rowSelectorFn?: (row: any) => boolean;
    @Input() isStatic = false;
    @Input() withoutBorder = false;
    @Input() whiteBackgroundPropertyCondition?: string;
    @Input() dangerBackgroundPropertyCondition?: string;
    @Input() customTrClassPipe?: any;

    // where to switch between mobile and desktop layout
    @Input() mobileLayoutBreakpoint = 'md';
    // html template for row detail
    @Input() rowDetailTemplate?: TemplateRef<any>;
    // html template for action column
    @Input() actionColTemplate?: TemplateRef<any>;
    @Input() actionColClass?: string;
    @Input() actionColTriggersDetail = false;
    // html custom template for caption
    @Input() customCaptionTemplate?: TemplateRef<any>;
    // html templates for individual columns
    @Input() columnTemplates?: { [templateName: string]: TemplateRef<any> };

    @Output()
    public rowOpened: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public rowSelected: EventEmitter<any> = new EventEmitter<any>();

    public isAdvanced = false;

    openedRow = null;
    selectedRow = null;
    totalCols = 0;
    mobileCols: Array<ITableColumnConfig> = [];

    // for performance reasons we calculate various classes on init just once
    desktopLayoutClasses: Array<string> = [];
    mobileLayoutClasses: Array<string> = [];

    constructor(public router: Router) {
        super();
    }

    ngOnChanges() {
        this.isAdvanced =
            this.tableClass && R.contains('table--advanced', this.tableClass);
        this.mobileCols = [];
        this.cols.forEach((column) => {
            column.views.forEach((view) => this.prepareViewClasses(view));
            if (column.hasOwnProperty('mobileViews')) {
                this.mobileCols.push(column);
                column.mobileViews.forEach((view) =>
                    this.prepareViewClasses(view)
                );
            }
            this.totalCols += column.views.length;
        });
        this.desktopLayoutClasses = this.getLayoutClasses(false);
        this.mobileLayoutClasses = this.getLayoutClasses(true);

        if (this.rowSelectorFn) {
            this.selectedRow = this.rows.find(this.rowSelectorFn);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event) {
        const target: HTMLElement = event.target || event.srcElement;
        if (target.tagName.toLowerCase() === 'a') {
            const link: string = target.getAttribute('href');
            if (isRouterLink(link)) {
                event.preventDefault();
                window.scrollTo(0, 0);
                return this.router.navigate([link]);
            }
        }
    }

    openRow(row) {
        if (this.rowDetailTemplate && !this.isStatic) {
            this.openedRow = this.openedRow === row ? null : row;
            this.rowOpened.emit(this.openedRow);
        }
    }

    selectRow(row) {
        if (!this.isStatic) {
            this.selectedRow = row;
            this.rowSelected.emit(this.selectedRow);
        }
    }

    private getLayoutClasses(mobile: boolean): Array<string> {
        if (!this.mobileCols.length) {
            // we don't have mobile views
            return [];
        }

        const position = viewBreakpoints.indexOf(this.mobileLayoutBreakpoint);

        if (mobile) {
            return this.getDisplayClasses(
                viewBreakpoints.slice(0, position),
                'table-row-group'
            );
        } else {
            return this.getDisplayClasses(
                viewBreakpoints.slice(position),
                'table-row-group'
            );
        }
    }

    private prepareViewClasses(view) {
        if (view.hasOwnProperty('showIn')) {
            const displayClasses = this.getDisplayClasses(
                view.showIn,
                'table-cell'
            );
            view.headingClass = view.hasOwnProperty('headingClass')
                ? R.union(displayClasses, view.headingClass)
                : displayClasses;
            view.cellClass = view.hasOwnProperty('cellClass')
                ? R.union(displayClasses, view.cellClass)
                : displayClasses;
        }
    }

    private getDisplayClasses(
        showIn: Array<string>,
        displayType: string
    ): Array<string> {
        return viewBreakpoints.map((breakpoint) => {
            if (showIn.includes(breakpoint)) {
                return breakpoint === 'xs'
                    ? `d-${displayType}`
                    : `d-${breakpoint}-${displayType}`;
            } else {
                return breakpoint === 'xs' ? 'd-none' : `d-${breakpoint}-none`;
            }
        });
    }
}
