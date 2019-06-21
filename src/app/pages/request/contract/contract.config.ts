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
        done: false,
        label: 'Podepsání smlouvy',
    },
];
