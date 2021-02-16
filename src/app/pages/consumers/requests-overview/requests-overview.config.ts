import { CONSTS } from 'src/app/app.constants';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export const confirmDeleteRequest = (data: ISupplyPoint): IShowModal => ({
    component: 'ConfirmModalComponent',
    modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_REQUEST,
    instanceData: {
        confirmText: `Opravdu chcete smazat rozpracovanou smlouvu <strong>${data.name}</strong>?`,
        titleConfirm: 'ANO SMAZAT',
        data,
    },
});
