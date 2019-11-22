import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    commodityTypes,
    ROUTES,
} from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent extends AbstractComponent implements OnInit {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public routePower = ROUTES.ROUTER_PATTERNS_OF_CONTRACTS_POWER;
    public routeGas = ROUTES.ROUTER_PATTERNS_OF_CONTRACTS_GAS;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: 'Vzory smluv o dodávce',
            },
        ];
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                // if (R.indexOf(params.commodityType, R.keys(commodityTypes)) < 0) {
                //     this.router.navigate([this.routePower]);
                //     return;
                // }
                // this.commodityType = commodityTypes[params.commodityType];
                // this.commodityType$.next(this.commodityType);
            });
    }
}
