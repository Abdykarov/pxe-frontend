import { Component, Input, TemplateRef } from '@angular/core';
// Own models
import { IBreadcrumbItems } from './models/breadcrumb.model';

@Component({
    selector: 'lnd-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
    @Input()
    public breadcrumbItems: IBreadcrumbItems;

    @Input()
    public dropdownContent?: TemplateRef<any>;
}
