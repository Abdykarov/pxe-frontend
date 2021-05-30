import { CONSTS } from 'src/app/app.constants';
import { IModalSize } from 'src/common/ui/modal/models/size.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import {
    IScrollSettings,
    SCROLL_TO,
} from 'src/app/services/model/scroll-to.model';
import { LpVideoModalComponent } from 'src/common/containers/modal/modals/lp-video/lp-video-modal.component';

export const lpVideoModalConfig = (): IShowModal => ({
    component: LpVideoModalComponent,
    modalType: CONSTS.MODAL_TYPE.LP_VIDEO,
    instanceData: {
        size: IModalSize.LG,
    },
});

export const scrollSettings: IScrollSettings = [
    {
        SCROLL_TO: SCROLL_TO.HELP,
        fragment: 's-cim-vam-pomuzeme',
    },
    {
        SCROLL_TO: SCROLL_TO.HOW_IT_WORKS,
        fragment: 'jak-to-funguje',
    },
    {
        SCROLL_TO: SCROLL_TO.BEST_PRICES_IN_THE_WORLD,
        fragment: 'vice-o-cenach',
    },
    {
        SCROLL_TO: SCROLL_TO.FAQ,
        fragment: 'faq',
    },
    {
        SCROLL_TO: SCROLL_TO.BLOG,
        fragment: 'blog',
    },
];
