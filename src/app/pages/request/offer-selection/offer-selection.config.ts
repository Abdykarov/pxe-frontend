import { ROUTES } from 'src/app/app.constants';

export const configStepper = [
    {
        url: ROUTES.ROUTER_REQUEST_OFFER_SELECTION,
        done: true,
        label: 'Výběr odběrného místa',
    },
    {
        url: ROUTES.ROUTER_REQUEST_SUPPLY_POINT,
        done: false,
        label: 'Výběr nabídky',
    },
    {
        url: ROUTES.ROUTER_DASHBOARD,
        done: false,
        label: 'Podepsání smlouvy',
    },
];
