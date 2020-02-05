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

    // public showBenefitContent = false;

    @Input()
    public title?: string;

    @Input()
    public accordionItems: IAccordionItem[] = [];

    @Input()
    public accordionContentTemplate?: TemplateRef<any>;

    public setActive = (index: Number) => {
        R.mapObjIndexed((item: IAccordionItem, key: string) => {
            item.isActive = index === parseInt(key, 10);
        }, this.accordionItems)
    }

    // public toggleBenefitContent = (event) => {
    //     event.preventDefault();
    //     event.cancelBubble = true;
    //     this.showBenefitContent = !this.showBenefitContent;
    // }
}
