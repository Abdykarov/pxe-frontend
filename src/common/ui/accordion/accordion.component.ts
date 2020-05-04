import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';

import * as R from 'ramda';

import { IAccordionItem } from './models/accordion-item.model';

@Component({
    selector: 'lnd-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})

export class AccordionComponent {

    @Input()
    public title?: string;

    @Input()
    public accordionItems: IAccordionItem[] = [];

    @Input()
    public accordionContentTemplate?: TemplateRef<any>;

    @Input()
    public onlyOneItemOpened = true;

    public toggleClick = (item) => {
        if (!item.isActive && this.onlyOneItemOpened) {
            R.map((accordionItem: IAccordionItem) => {
                accordionItem.isActive = false;
                return accordionItem ;
            }, this.accordionItems);
        }
        item.isActive = !item.isActive;
    }
}
