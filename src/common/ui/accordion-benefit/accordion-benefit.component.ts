import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import * as R from 'ramda';

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
    public accordionContentTemplate?: TemplateRef<any>;

    public setActive = (index: Number) => {
        R.mapObjIndexed((item: IAccordionItem, key: string) => {
            item.isActive = index === parseInt(key, 10) && !item.isActive;
        }, this.accordionItems)
    }

    public closeActive = (item: IAccordionItem) => {
        item.isActive = false;
    }
}
