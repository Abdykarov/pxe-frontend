import { CONSTS } from 'src/app/app.constants';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';

export const moreTabDialog = (): IShowModal => {
    return {
        component: 'ConfirmModalComponent',
        modalType: CONSTS.MODAL_TYPE.MORE_TABS,
        instanceData: {
            confirmText: `Aplikace je otevřená ve vícero oknech, chcete ji použít zde?`,
            showClose: false,
            showCloseButton: true,
            titleConfirm: 'Ano',
            titleClose: 'Ne',
        },
    };
};
