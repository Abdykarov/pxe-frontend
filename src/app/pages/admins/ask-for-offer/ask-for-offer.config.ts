import { IPaginationConfig } from 'src/app/pages/suppliers/concluded-contracts/concluded-contracts.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';

export const tableConfig: ITableColumnConfig[] = ([
    {
        label: 'Datum přijetí',
        views: [
            {
                headingClass: [''],
                cellClass: [''],
                contentTemplateName: 'columnCreatedAt',
            },
        ],
    },
    {
        label: 'E-mail',
        views: [
            {
                headingClass: [''],
                cellClass: [''],
                content: (row) => `${row.email}`,
            },
        ],

    },
    {
        label: 'Soubor',
        views: [
            {
                contentTemplateName: 'actionColumnPDF',
            },
        ],
    },

    {
        label: '',
        views: [
            {
                headingClass: ['text-right'],
                cellClass: ['text-right'],
                contentTemplateName: 'actionColumnFill',
            },
        ],
    },
]);

export const paginationConfig: IPaginationConfig = {
    itemsPerPage: 20,
    showBoundaryLinks: true,
    maxSize: 5,
    firstText: '<span class="arrow-text">first</span>',
    previousText: '<span class="arrow-text">prev</span>',
    nextText: '<span class="arrow-text">next</span>',
    lastText: '<span class="arrow-text">last</span>',
};
