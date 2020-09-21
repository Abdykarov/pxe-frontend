import { CONSTS } from 'src/app/app.constants';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { LpVideoModalComponent } from '../../../common/containers/modal/modals/lp-video/lp-video-modal.component';

export const lpVideoModalConfig = (): IShowModal => ({
    component: LpVideoModalComponent,
    modalType: CONSTS.MODAL_TYPE.LP_VIDEO,
    instanceData: {},
});
