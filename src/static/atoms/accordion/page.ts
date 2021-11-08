import { Component } from '@angular/core';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class AccordionPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public accordionItems1: IAccordionItem[] = [
        {
            label: 'Accordion item 1',
            isActive: true,
            data: 'Lorem ipsum dolor sit amet...',
        },
        {
            label: 'Accordion item 2',
            isActive: false,
            data: 'Lorem ipsum dolor sit amet...',
        },
        {
            label: 'Accordion item 3',
            isActive: false,
            data: 'Lorem ipsum dolor sit amet...',
        },
    ];

    public accordionItems2: IAccordionItem[] = [
        {
            label: 'Accordion item 1',
            isActive: true,
            data: {
                firstname: 'John',
                lastname: 'Doe',
            },
        },
        {
            label: 'Accordion item 2',
            isActive: false,
            data: {
                firstname: 'John',
                lastname: 'Doe',
            },
        },
    ];

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Accordion',
                url: null,
            },
        ];
    }
}
