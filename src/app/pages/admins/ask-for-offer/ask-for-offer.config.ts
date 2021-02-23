import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';

export const rows: ITableColumnConfig[] = ([
    {
        label: 'Datum přijetí',
        views: [
            {
                headingClass: [''],
                cellClass: [''],
                content: (row) => `${row.date}`,
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
        label: 'PDF',
        views: [
            {
                headingClass: [''],
                cellClass: [''],
                content: (row) => `${row.fileName}`,
            },
        ],
    },
    {
        label: '',
        views: [
            {
                contentTemplateName: 'actionColumnFill',
            },
        ],
    },
]);

export const invoices = [
    {
        id: 53,
        date: '11.22.2015',
        email: 'email',
        fileName: 'lamanc.pdf',
    },
    {
        id: 52,
        date: '11.22.2015',
        email: 'email',
        fileName: 'lamanc.pdf',
    },
    {
        id: 51,
        date: '11.22.2015',
        email: 'email',
        fileName: 'lamanc.pdf',
    },
    {
        id: 50,
        date: '11.22.2015',
        email: 'email',
        fileName: 'lamanc.pdf',
    },
    {
        id: 9090,
        date: '11.22.2015',
        email: 'email',
        fileName: 'lamanc.pdf',
    },
];

