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
        url: '/basic/recapitulation',
            done: false,
            label: 'Rekapitulace',
            shadowStep: true,
        },
    {
        url: '',
            done: false,
            label: 'Rekapitulace',
            shadowStep: true,
        },
    {
        url: '',
            done: false,
            label: 'Podepsání smlouvy',
        },
];
