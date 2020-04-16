import {
    Injectable,
    PLATFORM_ID,
} from '@angular/core';

import { CookiesService } from 'src/app/services/cookies.service';

export enum OnlyOneTabActiveType {
    UUID, CLOSED, EMPTY,
}

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

    private mapTypeToValue

    public setActiveTab = (onlyOneTabActiveType: OnlyOneTabActiveType) => {
        this.cookieService.set('active_tab', this.uuid, 0);
    }

}
