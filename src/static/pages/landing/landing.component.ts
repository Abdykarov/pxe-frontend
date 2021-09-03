import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { configSupplier } from 'src/static/config/suppliers.config';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import { FileUploader } from 'src/third-sides/file-upload';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ICardData } from 'src/common/ui/card/models/data.model';
import {
    IFieldError,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { ISupplierLogo } from 'src/common/ui/supplier/model/supplier.model';
import { playVideo } from 'src/common/utils';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractComponent {

    @ViewChild('video')
    public _video: ElementRef;

    public breadcrumbItemsSimple: IBreadcrumbItems;
    public configSupplier: ISupplierLogo[] = configSupplier;
    public formLoading = false;
    public formFields = createRegistrationFormFields(SignUpType.NewsSubscription);
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public isMoreThanMdResolution = false;
    public showStickyButton = false;
    public accordionItems: IAccordionItem[] = [{
        label: 'Opravdu budu mít vybranou cenu po celou dobu zvoleného období?',
        data: 'Ano, dodavatel vám cenu za silovou elektřinu nebo za odebraný zemní plyn nemůže změnit.' +
            'To však neplatí pro regulované ceny, které jsou stanoveny Cenovým rozhodnutím Energetického regulačního úřadu.',
        isActive: false,
        },
        {
            label: 'Mohu někde dostat lepší cenu?',
            data: 'Nedá se vyloučit, že někteří dodavatelé, mimo parc4u, mohou z ' +
                'nějakého důvodu poskytnout lepší cenové podmínky. Ty ale budou, s největší pravděpodobností,' +
                ' vykoupeny nějakými „kličkami a háčky“ v podmínkách dodávky, které v parc4u nechceme.',
            isActive: false,
        },
        {
            label: 'Jak se dozvím, že změna dodavatele proběhla úspěšně?',
            data: 'O úspěšné změně vás bude informovat nový dodavatel.' +
                ' Současně vám, před zahájením odběru, zašle zálohový kalendář.',
            isActive: false,
        },
    ];

    public cardConfig: ICardData[] = [
        {
            img: 'assets/images/landing-page/our-help-move.png',
            imgAlt: 'stehuji-se',
            imgTitle: 'Stěhujeti se',
            title: 'Stěhujeti se',
            content: 'S novým bydlením přichází spousta radostí i starostí. Vy se věnujte zařizování nového bydlení. Převod elektřiny a plynu nechte na nás.',
        },
        {
            img: 'assets/images/landing-page/our-help-managa-build.png',
            imgAlt: 'spravuji-nemovitosti',
            imgTitle: 'Spravuji nemovitost',
            title: 'Spravuji nemovitost',
            content: 'Neztrácejte čas opakovaným hledáním dodavatelů energií. Pro každou nemovitost vám připravíme nabídky od prověřených dodavatelů. Všechny informace budete mít k dispozici přehledně na jednom místě v aplikaci parc4u.',
        },
        {
            img: 'assets/images/landing-page/our-help-i-want-save-money.png',
            imgAlt: 'chci-usetrit',
            imgTitle: 'Chci ušetřit',
            title: 'Chci ušetřit',
            content: 'Do aplikace parc4u si uložíte všechny své smlouvy od aktuálních dodavatelů energií. My vám dáme vědět, když objevíme lepší cenu. A vy se podle toho rozhodnete, zda chcete zařídit změnu dodavatele.',
        },
        {
            img: 'assets/images/landing-page/our-help-we-are-not-comparer.png',
            imgAlt: 'nejsme-srovnavac',
            imgTitle: 'Nejsme srovnávač',
            title: 'Nejsme srovnávač',
            content: 'Ceny budeme hlídat za vás a když narazíme na nějaké lepší, pošleme vám nabídky. Pokud budete chtít udělat změnu, zařídíme i převod nebo smlouvu s novým dodavatelem.',
        },
        {
            img: 'assets/images/landing-page/our-help-business.png',
            imgAlt: 'zivnostnik',
            imgTitle: 'Živnostník',
            title: 'Živnostník',
            content: 'Snižte své účty za elektřinu a plyn. My za vás budeme hlídat finančně zajímavé nabídky dodavatelů energií a vy si z nich jen vyberete.',
        },
        {
            img: 'assets/images/landing-page/our-help-company.png',
            imgAlt: 'firma',
            imgTitle: 'Firma',
            title: 'Firma',
            content: 'V aplikaci parc4u si vyberete dodavatele energií, který vám nejvíc sedne. Smlouvu a vše ostatní už za vás zařídíme my.',
        },
        {
            img: 'assets/images/landing-page/our-help-compare-company.png',
            imgAlt: 'sprava-firmy',
            imgTitle: 'Správa firmy',
            title: 'Správa firmy',
            content: 'Nahrajte do aplikace poslední fakturu za energie a vyberte si nejlepšího dodavatele. O vše ostatní se postaráme my.',
            customClasses: 'card-tile__item--last-item',
        },
        {
            img: 'assets/images/landing-page/our-help-svj.png',
            imgAlt: 'svj',
            imgTitle: 'SVJ',
            title: 'SVJ',
            content: 'Členové SVJ budou nadšeni z nižších účtů za elektřinu a plyn. A vy budete mít v aplikaci parc4u nad vším perfektní přehled.',
            customClasses: 'card-tile__item--last-item',
        },
    ];

    public cardBlogConfig: ICardData[] = [
        {
            img: 'assets/images/demo/card-default.jpg',
            imgAlt: 'Zajima-vas-puvod-energie-kterou-hodlate-odebirat',
            imgTitle: 'Zajímá vás původ energie, kterou hodláte odebírat?',
            textPrefix: '15. 2. 2021',
            title: 'Zajímá vás původ energie, kterou hodláte odebírat?',
            content: 'S aplikací parc4u můžete všechny dodavatele elektřiny a plynu ovládat z jednoho místa.',
        },
        {
            img: 'assets/images/demo/card-default.jpg',
            imgAlt: 'spravuji-nemovitosti',
            imgTitle: 'S-aplikaci-parc4u-muzete-vsechny-dodavatele-elektriny',
            textPrefix: '24. 1. 2021',
            title: 'S aplikací parc4u můžete všechny dodavatele elektřiny',
            content: 'S aplikací parc4u můžete všechny dodavatele elektřiny a plynu ovládat z jednoho místa.',
        },
        {
            img: 'assets/images/demo/card-default.jpg',
            imgAlt: 'porovnejte-nabidky-vybranych-dodavatelu',
            imgTitle: 'Porovnejte nabídky vybraných dodavatelů',
            textPrefix: '3. 1. 2021',
            title: 'Porovnejte nabídky vybraných dodavatelů',
            content: 'S aplikací parc4u můžete všechny dodavatele elektřiny a plynu ovládat z jednoho místa.',
        },
    ];

    public tileCard = {
        imgSrc: 'assets/images/landing-page/our-help-cottage.png',
        imgAlt: 'Card image',
        imgTitle: 'Card title',
        title: 'Tile card',
        content: 'Card text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };

    public fileUploader = new FileUploader({
        url: 'none',
    });

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
        public cd: ChangeDetectorRef,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION;
        }

        this.breadcrumbItemsSimple = [
            {
              label: 'Landing page',
              url: null,
            },
        ];

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(_  =>
                this.isMoreThanMdResolution = window.innerWidth >= CONSTS.MD_RESOLUTION,
            );
    }

    public submitForm = (values) => {
        this.formLoading = true;
        alert('Formulář odeslán');
    }

    public click = (evt) => {
        evt.preventDefault();
        console.log('click');
    }

    public play = (event = null) => {
        if (event) {
            event.preventDefault();
        }

        playVideo(this.video);
    }

    public pause =  (event = null) => {
        if (event) {
            event.preventDefault();
        }

        this.video.pause();
    }

    get isVideoPlaying(): boolean {
        return this._video && !this.video.paused;
    }

    get video(): HTMLMediaElement {
        return this._video && this._video.nativeElement;
    }
}
