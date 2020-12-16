import { CONSTS } from 'src/app/app.constants';
import { ICardData } from 'src/common/ui/card/models/data.model';
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

export const cardConfig: ICardData[] = [
    {
        imgSrc: 'assets/images/landing-page/our-help-stehuji-se.png',
        imgAlt: 'stehuji-se',
        imgTitle: 'Stěhujeti se',
        title: 'Stěhujeti se',
        content: 'S novým bydlením přichází spousta radostí i starostí. Vy se věnujte zařizování nového bydlení. Převod elektřiny a plynu nechte na nás.',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-spravuji-nemovitosti.png',
        imgAlt: 'spravuji-nemovitosti',
        imgTitle: 'Spravuji nemovitost',
        title: 'Chci ušetřit',
        content: 'Neztrácejte čas opakovaným hledáním dodavatelů energií. Pro každou nemovitost vám připravíme nabídky od prověřených dodavatelů. Všechny informace budete mít k dispozici přehledně na jednom místě v aplikaci parc4u.',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-chci-usetrit.png',
        imgAlt: 'chci-usetrit',
        imgTitle: 'Chci ušetřit',
        title: 'Chci ušetřit',
        content: 'Do aplikace parc4u si uložíte všechny své smlouvy od aktuálních dodavatelů energií. My vám dáme vědět, když objevíme lepší cenu. A vy se podle toho rozhodnete, zda chcete zařídit změnu dodavatele.',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-chci-usetrit.png',
        imgAlt: 'nejsme-srovnavac',
        imgTitle: 'Nejsme srovnávač',
        title: 'Nejsme srovnávač',
        content: 'Ceny budeme hlídat za vás a když narazíme na nějaké lepší, pošleme vám nabídky. Pokud budete chtít udělat změnu, zařídíme i převod nebo smlouvu s novým dodavatelem.',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-chci-usetrit.png',
        imgAlt: 'zivnostnik',
        imgTitle: 'Živnostník',
        title: 'Živnostník',
        content: 'Snižte své účty za elektřinu a plyn. My za vás budeme hlídat finančně zajímavé nabídky dodavatelů energií a vy si z nich jen vyberete.',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-chci-usetrit.png',
        imgAlt: 'firma',
        imgTitle: 'Firma',
        title: 'Firma',
        content: 'V aplikaci parc4u si vyberete dodavatele energií, který vám nejvíc sedne. Smlouvu a vše ostatní už za vás zařídíme my.',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-chci-usetrit.png',
        imgAlt: 'sprava-firmy',
        imgTitle: 'Správa firmy',
        title: 'Správa firmy',
        content: 'TODO',
        customClass: 'card-tile__item--last-item',
    },
    {
        imgSrc: 'assets/images/landing-page/our-help-svj.png',
        imgAlt: 'svj',
        imgTitle: 'SVJ',
        title: 'SVJ',
        content: 'Členové SVJ budou nadšeni z nižších účtů za elektřinu a plyn. A vy budete mít v aplikaci parc4u nad vším perfektní přehled.',
        customClass: 'card-tile__item--last-item',
    },
];
