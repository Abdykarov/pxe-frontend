export const tableCols = {
    main: [
        {
            label: 'First column',
            views: [
                {
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.first.a}</span>${row.first.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.first.a} ${row.first.b}`,
                },
            ],
        },
        {
            label: 'Second column',
            views: [
                {
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.second.a}</span>${row.second.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.second.a} ${row.second.b}`,
                },
            ],
        },
        {
            label: 'Third column',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-30'],
                    cellClass: ['w-30'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.third.a}</span>${row.third.b}`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.third.a}</span>${row.third.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.third.a} ${row.third.b}`,
                },
            ],
        },
        {
            label: 'Fourth column',
            views: [
                {
                    showIn: ['xl'],
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.fourth.a}</span>${row.fourth.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.fourth.a} ${row.fourth.b}`,
                },
            ],
        },
        {
            label: 'Last column',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-30'],
                    cellClass: ['w-30'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.last.a}</span>${row.last.b}`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.last.a}</span>${row.last.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.last.a} ${row.last.b}`,
                },
            ],
        },
    ],
    detail: [
        {
            label: 'First detail column',
            views: [
                {
                    content: (row) => row.first,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.first,
                },
            ],
        },
        {
            label: 'Second detail column',
            views: [
                {
                    content: (row) => row.second,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.second,
                },
            ],
        },
        {
            label: 'Third detail column',
            views: [
                {
                    content: (row) => row.third,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.third,
                },
            ],
        },
        {
            label: 'Last detail column',
            views: [
                {
                    content: (row) => row.last,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.last,
                },
            ],
        },
    ],
};

export const tableColsSnd = {
    main: [
        {
            label: 'First column',
            views: [
                {
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.first.a}</span>${row.first.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.first.a} ${row.first.b}`,
                },
            ],
        },
        {
            label: 'Second column',
            views: [
                {
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.second.a}</span>${row.second.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.second.a} ${row.second.b}`,
                },
            ],
        },
        {
            label: 'Third column',
            views: [
                {
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.third.a}</span>${row.third.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.third.a} ${row.third.b}`,
                },
            ],
        },
        {
            label: 'Fourth column',
            views: [
                {
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.fourth.a}</span>${row.fourth.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.fourth.a} ${row.fourth.b}`,
                },
            ],
        },
        {
            label: 'Last column',
            views: [
                {
                    cellClass: ['w-20', 'text-right'],
                    headingClass: ['text-right'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.last.a}</span>${row.last.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.last.a} ${row.last.b}`,
                },
            ],
        },
    ],
};

export const tableRows = {
    main: [
        {
            first: { a: 'First row', b: 'first cell' },
            second: { a: 'First row', b: 'second cell'},
            third: { a: 'First row', b: 'third cell'},
            fourth: { a: 'First row', b: 'fourth cell'},
            last: { a: 'First row', b: 'last cell'},
        },
        {
            first: { a: 'Second row', b: 'first cell'},
            second: { a: 'Second row', b: 'second cell'},
            third: { a: 'Second row', b: 'third cell'},
            fourth: { a: 'Second row', b: 'fourth cell'},
            last: { a: 'Second row', b: 'last cell'},
        },
        {
            first: { a: 'Third row', b: 'first cell'},
            second: { a: 'Third row', b: 'second cell'},
            third: { a: 'Third row', b: 'third cell'},
            fourth: { a: 'Third row', b: 'fourth cell'},
            last: { a: 'Third row', b: 'last cell'},
        },
        {
            first: { a: 'Last row', b: 'first cell'},
            second: { a: 'Last row', b: 'second cell'},
            third: { a: 'Last row', b: 'third cell'},
            fourth: { a: 'Last row', b: 'fourth cell'},
            last: { a: 'Last row ', b: 'last cell'},
        },
    ],
    detail: [
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
    ],
};
