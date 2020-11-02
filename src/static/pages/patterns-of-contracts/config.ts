export const tableConfig = [
    {
        views: [
            {
                content: (row) => row.validity,
            },
        ],
    },
    {
        views: [
            {
                contentTemplateName: 'columnTemplateDownload',
                cellClass: 'text-right',
            },
        ],
    },
];

export const rows = [
    {
        validity: 'Platná v období 500000 př. n. l. do dnes',
    },
    {
        validity: 'Platná v období 500000 př. n. l. do dnes',
    },
    {
        validity: 'Platná v období 500000 př. n. l. do dnes',
    },
];
