import { Component } from '@angular/core';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

// own modules
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './not-found.component.html',
})
export class NotFoundComponent extends AbstractComponent {
    public breadcrumbItems: IBreadcrumbItems = [
        {
            label: '404 - Stránka nenalezena',
        },
    ];
}
