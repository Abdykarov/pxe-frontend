export const tableCols = [
    {
        label: 'First column',
        views: [
            {
                content: (row) => row.first,
            },
        ],
    },
    {
        label: 'Second column',
        views: [
            {
                showIn: ['md', 'lg', 'xl'],
                content: (row) => row.second,
            },
        ],
    },
    {
        label: 'Third column',
        views: [
            {
                showIn: ['md', 'lg', 'xl'],
                content: (row) => row.third,
            },
        ],
    },
    {
        label: 'Last column',
        views: [
            {
                content: (row) => row.last,
            },
        ],
    },
];

export const tableRows = [
    {
        first: 'First row first cell',
        second: 'First row second cell',
        third: 'First row third cell',
        last: 'First row last cell',
    },
    {
        first: 'Second row first cell',
        second: 'Second row second cell',
        third: 'Second row third cell',
        last: 'Second row last cell',
    },
    {
        first: 'Third row first cell',
        second: 'Third row second cell',
        third: 'Third row third cell',
        last: 'Third row last cell',
    },
    {
        first: 'Last row first cell',
        second: 'Last row second cell',
        third: 'Last row third cell',
        last: 'Last row last cell',
   },
];
