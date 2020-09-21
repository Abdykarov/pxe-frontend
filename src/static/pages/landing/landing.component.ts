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
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
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
            data: 'Nedá se vyloučit, že někteří dodavatelé, mimo PARC4U, mohou z ' +
                'nějakého důvodu poskytnout lepší cenové podmínky. Ty ale budou, s největší pravděpodobností,' +
                ' vykoupeny nějakými „kličkami a háčky“ v podmínkách dodávky, které v PARC4U nechceme.',
            isActive: false,
        },
        {
            label: 'Jak se dozvím, že změna dodavatele proběhla úspěšně?',
            data: 'O úspěšné změně vás bude informovat nový dodavatel.' +
                ' Současně vám, před zahájením odběru, zašle zálohový kalendář.',
            isActive: false,
        },
    ];

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
