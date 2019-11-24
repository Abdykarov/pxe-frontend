import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    Component,
    OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { CommodityType, SubjectType } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent extends AbstractComponent implements OnInit {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public readonly COMMODITY_TYPE_GAS = CommodityType.GAS;
    public readonly COMMODITY_TYPE_POWER = CommodityType.POWER;

    public commodityType = CommodityType.POWER;
    public subjectType = SubjectType.SUBJECT_TYPE_INDIVIDUAL;

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
                this.commodityType = params.commodityType.toLowerCase();
                this.subjectType = params.subjectType.toLowerCase();
            });
    }

    public routeToSubjectType = () => {

    }

    public routeToCommodityType = (commodityType: string) => {

    }
}
