import {
    Component,
} from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FaqComponent extends AbstractComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: 'Často kladené otázky',
        },
    ];
}
