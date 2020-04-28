import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { configCoverage } from 'src/static/config/map-coverage.config';
import { configSupplier } from 'src/static/config/suppliers.config';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    IFieldError,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';
import { ISupplierLogo } from 'src/common/ui/supplier/model/supplier.model';
import {
    carouselItems,
    interval,
} from 'src/static/pages/landing/config';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
})
export class LandingComponent extends AbstractComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public configCoverage: IMapCoverageConfig = configCoverage;
    public configSupplier: ISupplierLogo[] = configSupplier;
    public formLoading = false;
    public formFields = createRegistrationFormFields(SignUpType.NewsSubscription);
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public items = carouselItems;
    public interval = interval;
    public isMoreThanXlResolution = false;
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
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.isMoreThanXlResolution = window.innerWidth >= CONSTS.XL_RESOLUTION;
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
                this.isMoreThanXlResolution = window.innerWidth >= CONSTS.XL_RESOLUTION,
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
}
