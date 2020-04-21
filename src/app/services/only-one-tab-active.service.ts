import { isPlatformBrowser } from '@angular/common';
import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';

import generateUuid from 'uuid/v4';

import { CONSTS } from 'src/app/app.constants';
import { CookiesService } from 'src/app/services/cookies.service';
import { inArray } from 'src/common/utils';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';

@Injectable({
    providedIn: 'root',
})
export class OnlyOneTabActiveService {
    public readonly uuid: string;

    constructor(
        private cookieService: CookiesService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        this.uuid = generateUuid();
    }

    isThisTabActive = (uuid: string = '_'): boolean =>
        inArray(this.cookieService.get('active_tab'), [this.uuid, uuid])

    setActiveTab = (value: string = null): void => {
        if (isPlatformBrowser(this.platformId)) {
            const newValue = value ? value : this.uuid;
            this.cookieService.set('active_tab', newValue, 0);
            localStorage.setItem('active_tab', newValue);
        }
    }

    moreTabDialog = (): IShowModal => (
        {
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.MORE_TABS,
            instanceData: {
                confirmText: `Aplikace je otevřená ve vícero oknech, chcete ji použít zde?`,
                showClose: false,
                showCloseButton: true,
                titleConfirm: 'Ano',
                titleClose: 'Ne',
            },
        }
    )

}
