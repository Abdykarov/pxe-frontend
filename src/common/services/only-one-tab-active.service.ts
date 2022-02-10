import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CONSTS } from 'src/app/app.constants';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { CookiesService } from 'src/common/services/cookies.service';
import { OnlyOneTabActiveState } from 'src/common/services/model/only-one-tab-active.model';
import { v4 as generateUuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class OnlyOneTabActiveService {
    public readonly uuid: string;

    constructor(
        private cookieService: CookiesService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        this.uuid = generateUuid();
    }

    isThisTabActive = (): boolean =>
        this.cookieService.get(CONSTS.STORAGE_HELPERS.ACTIVE_TAB) === this.uuid;

    setActiveTab = (value: string = null): void => {
        if (isPlatformBrowser(this.platformId)) {
            const newValue = value ? value : this.uuid;
            this.cookieService.set(
                CONSTS.STORAGE_HELPERS.ACTIVE_TAB,
                newValue,
                0
            );
            localStorage.setItem(CONSTS.STORAGE_HELPERS.ACTIVE_TAB, newValue);
            if (value === OnlyOneTabActiveState.LOGOUT) {
                localStorage.removeItem(CONSTS.STORAGE_HELPERS.ACTIVE_TAB);
            }
        }
    };

    moreTabDialog = (): IShowModal => ({
        component: 'ConfirmModalComponent',
        modalType: CONSTS.MODAL_TYPE.MORE_TABS,
        instanceData: {
            confirmText: `Aplikace parc4u je otevřena na několika kartách, použít zde?`,
            showClose: false,
            showCloseButton: true,
            titleConfirm: 'Použít zde',
            titleClose: 'Odhlásit',
        },
    });
}
