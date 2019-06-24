import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ROUTES } from 'src/app/app.constants';

export const configStepper: IStepperProgressItem[] = [
    {
        url: ROUTES.ROUTER_REQUEST_SUPPLY_POINT,
        done: true,
        label: 'Výběr odběrného místa',
    },
    {
        url: ROUTES.ROUTER_REQUEST_OFFER_SELECTION,
        done: true,
        label: 'Výběr nabídky',
    },
    {
        url: ROUTES.ROUTER_REQUEST_CONTRACT,
        done: true,
        shadowStep: true,
        label: 'Smlouva',
    },
    {
        url: ROUTES.ROUTER_REQUEST_PAYMENT,
        done: false,
        shadowStep: true,
        label: 'Platba',
    },
    {
        url: ROUTES.ROUTER_REQUEST_RESULT,
        done: false,
        label: 'Podepsání smlouvy',
    },
];
