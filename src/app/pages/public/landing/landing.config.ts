import { CONSTS } from 'src/app/app.constants';
import { LpVideoModalComponent } from 'src/common/containers/modal/modals/lp-video/lp-video-modal.component';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import {
    IScrollSettings,
    SCROLL_TO,
} from 'src/common/services/model/scroll-to.model';
import { IModalSize } from 'src/common/ui/modal/models/size.model';

export const lpVideoModalConfig = (): IShowModal => ({
    component: LpVideoModalComponent,
    modalType: CONSTS.MODAL_TYPE.LP_VIDEO,
    instanceData: {
        size: IModalSize.LG,
    },
});

export const scrollSettings: IScrollSettings = [
    {
        scrollTo: SCROLL_TO.HELP,
        fragment: 's-cim-vam-pomuzeme',
    },
    {
        scrollTo: SCROLL_TO.HOW_IT_WORKS,
        fragment: 'jak-to-funguje',
    },
    {
        scrollTo: SCROLL_TO.BEST_PRICES_IN_THE_WORLD,
        fragment: 'vice-o-cenach',
    },
    {
        scrollTo: SCROLL_TO.FAQ,
        fragment: 'faq',
    },
    {
        scrollTo: SCROLL_TO.BLOG,
        fragment: 'blog',
    },
];
