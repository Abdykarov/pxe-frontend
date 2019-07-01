export const configStepper = [
    {
        url: '/basic/new-supply-point',
        done: true,
        label: 'Výběr odběrného místa',
    },
    {
        url: '/basic/menu-selection',
            done: true,
            label: 'Výběr nabídky',
        },
    {
        url: '/basic/payment-verification',
            done: false,
            label: 'Podepsání smlouvy',
        },
];

export const transactionCols = {
    main: [
        {
            label: 'Zaúčtováníasdas',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">asdasdDnes</span>${row.time}`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-10'],
                    content: (row) => `<span class="d-block font-weight-bold">zxczxcDnes</span>${row.time}`,
                },
            ],
            mobileViews: [
                {
                    headingClass: ['w-40'],
                    cellClass: ['w-60', 'font-weight-bold', 'text-right'],
                    content: (row) => `Dnes, ${row.time}`,
                },
            ],
        },
        {
            label: 'Číslo protiúčtu',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-40'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.sender.name}</span>${row.sender.account}`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-30'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.sender.name}</span>${row.sender.account}`,
                },
            ],
            mobileViews: [
                {
                    headingClass: ['w-40'],
                    cellClass: ['w-60', 'font-weight-bold', 'text-right'],
                    content: (row) => `${row.sender.account}`,
                },
            ],
        },
        {
            label: 'Variabilní symbol',
            views: [
                {
                    showIn: ['xl'],
                    headingClass: ['w-30'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.symbols.vs}</span>`,
                },
            ],
            mobileViews: [
                {
                    headingClass: ['w-40'],
                    cellClass: ['w-60', 'font-weight-bold', 'text-right'],
                    content: (row) => `${row.symbols.vs}`,
                },
            ],
        },
        {
            label: 'Částka',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-40', 'text-right'],
                    cellClass: ['text-right'],
                    content: (row) => row.amount.startsWith('+')
                        ? `<span class="font-weight-bold text-success">${row.amount}</span>`
                        : `<span class="font-weight-bold">${row.amount}</span>`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-30', 'text-right'],
                    cellClass: ['text-right'],
                    content: (row) => row.amount.startsWith('+')
                        ? `<span class="font-weight-bold text-success">${row.amount}</span>`
                        : `<span class="font-weight-bold">${row.amount}</span>`,
                },
            ],
            mobileViews: [
                {
                    headingClass: ['w-40'],
                    cellClass: ['w-60', 'font-weight-bold', 'text-right', 'text-success'],
                    content: (row) => `${row.amount}`,
                },
            ],
        },
    ],
};

export const transactionRows = [
    {
        time: '13:06',
        refNo: '1234567890',
        sender: {
            name: 'Invelt s.r.o.',
            account: '35-981739111/0300',
        },
        symbols: {
            vs: '2018101',
            ks: '0308',
            ss: '1919',
        },
        amount: '+ 122 002 483,90 CZK',
        description: 'Letní setkání zaměstnanců',
        message: 'Pronájem prostorů, Kongresové centrum - 28.6.2017',
    },
];
