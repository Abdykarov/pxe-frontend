import { CONSTS } from 'src/app/app.constants';
import { IModalSize } from 'src/common/ui/modal/models/size.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { LpVideoModalComponent } from 'src/common/containers/modal/modals/lp-video/lp-video-modal.component';

export const lpVideoModalConfig = (): IShowModal => ({
    component: LpVideoModalComponent,
    modalType: CONSTS.MODAL_TYPE.LP_VIDEO,
    instanceData: {
        size: IModalSize.LG,
    },
});
