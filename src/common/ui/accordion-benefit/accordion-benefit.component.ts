import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import { IAccordionItem } from './models/accordion-item.model';

@Component({
    selector: 'lnd-accordion-benefit',
    templateUrl: './accordion-benefit.component.html',
    styleUrls: ['./accordion-benefit.component.scss'],
})

export class AccordionBenefitComponent {

    @Input()
    public title?: string;

    @Input()
    public accordionItems: IAccordionItem[] = [];

    @Input()
    public isMoreOpen = false;

    @Input()
    public moreOpenItemsCount = 2;

    @Input()
    public showAll = true;

    @Input()
    public accordionContentTemplate?: TemplateRef<any>;

    @Input()
    public footerMoreLabel = 'Zobrazit vše';

    @Input()
    public footerLessLabel = 'Zobrazit méně';
}
