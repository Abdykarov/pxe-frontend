import {
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { getConfigStepper } from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';
import { TypeOfList } from 'src/common/ui/list-of-notifications/models/list-of-notifications.model';

@Component({
    selector: 'lnd-signboard',
    templateUrl: './signboard.component.html',
    styleUrls: ['./signboard.component.scss'],
})
export class SignboardComponent {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.SUPPLY_POINT;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public notifications = [
        'Fakturu se současným dodavatelem (jedno jakého data).',
        'Ověřte způsob výpovědi vaší smlouvy, v případě, že si nebude jistí zanechte přednastavenou hodnotu.',
        'Pro uzavření smlouvy budete potřebovat váš mobilní telefon.',
    ];
    public typeOfListCheck = TypeOfList.CHECKLIST;

    constructor(
        private router: Router,
    ) {}

    public fillClick = (evt) => this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
}
