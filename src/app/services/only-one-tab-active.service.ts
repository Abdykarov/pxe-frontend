import {
    Injectable,
    PLATFORM_ID,
} from '@angular/core';

import { CookiesService } from 'src/app/services/cookies.service';
import { OnlyOneTabActiveType } from 'src/app/services/model/only-one-tab-active.model';

@Injectable({
    providedIn: 'root',
})
export class OnlyOneTabActiveService {
    private readonly uuid: string;

    constructor(
        private cookieService: CookiesService,
    ) {
        this.uuid = this.generateUuid();
    }

    private generateUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public isThisTabActive = () => this.cookieService.get('active_tab') === this.uuid;

    private mapTypeToValue = (onlyOneTabActiveType: OnlyOneTabActiveType) => {
        switch (onlyOneTabActiveType) {
            case OnlyOneTabActiveType.UUID:
            return this.uuid;
            case OnlyOneTabActiveType.CLOSED:
            return 'CLOSED';
            case OnlyOneTabActiveType.EMPTY:
            return '';
        }
        return '';
    }

    public setActiveTab = (onlyOneTabActiveType: OnlyOneTabActiveType) => {
        this.cookieService.set(this.mapTypeToValue(onlyOneTabActiveType), this.uuid, 0);
    }

}
