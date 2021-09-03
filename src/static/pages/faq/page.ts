import { Component } from '@angular/core';

import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    IQuestion,
    Tag,
} from 'src/app/services/model/faq.model';

@Component({
    templateUrl: './page.html',
})
export class FaqPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public question: IQuestion = {
        id: 1,
        tag:  {
            type: Tag.SUPPLIER,
            url: 'supplier',
            label: 'Dodavatelé',
            title: 'Otázky',
        },
        url: 'price-length',
        header: 'Opravdu budu mít vybranou cenu po celou dobu zvoleného období?',
        shortContent: 'Ano, dodavatel vám cenu za silovou elektřinu nebo za odebraný zemní plyn nemůže změnit. ' +
            'To však neplatí pro regulované ceny, které jsou stanoveny Cenovým rozhodnutím Energetického regulačního úřadu.',
        oneOfMostVisited: true,
    };

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

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: null,
            },
            {
                label: 'Často kladené otázky',
                url: null,
            },
        ];
    }

    public routerTo = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }
}
