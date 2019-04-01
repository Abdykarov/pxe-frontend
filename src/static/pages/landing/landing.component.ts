import { Component, OnInit } from '@angular/core';
import {IBreadcrumbItems} from '../../../common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
              label: 'Landing page',
              url: null,
            },
        ];
    }

    ngOnInit() {}

}
