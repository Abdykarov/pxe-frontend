import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    Component,
    OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { AbstractComponent } from 'src/common/abstract.component';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    CommodityType,
    SubjectType,
} from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent extends AbstractComponent implements OnInit {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public readonly COMMODITY_TYPE = CommodityType;
    public readonly SUBJECT_TYPE = SubjectType;

    public commodityType = this.COMMODITY_TYPE.POWER;
    public subjectType = this.SUBJECT_TYPE.SUBJECT_TYPE_INDIVIDUAL;

    public urlPdfContract = '/assets/pdfs/static/smlouva.pdf';

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
                this.commodityType = params.commodityType;
                this.subjectType = params.subjectType;
            });
    }

    public routeToSubjectType = (subjectType: SubjectType) => {
        this.subjectType = subjectType;
        this.navigateToCurrentUrl();
    }

    public routeToCommodityType = (commodityType: CommodityType) => {
        this.commodityType = commodityType;
        this.navigateToCurrentUrl();
    }

    public navigateToCurrentUrl = () => {
        this.router.navigate([`${CONSTS.PATHS.PATTERNS_OF_CONTRACTS}/${this.commodityType}/${this.subjectType}`]);
    }
}
