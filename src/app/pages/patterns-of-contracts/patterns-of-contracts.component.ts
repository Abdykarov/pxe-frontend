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
    CommodityTypesLowerCase,
    CONSTS,
    ROUTES,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent extends AbstractComponent implements OnInit {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public readonly COMMODITY_TYPE = CommodityTypesLowerCase;
    public readonly SUBJECT_TYPE = SubjectTypeLowerCase;

    public commodityType = this.COMMODITY_TYPE.POWER;
    public subjectType = this.SUBJECT_TYPE.INDIVIDUAL;

    public urlToPdfs = {
        [this.COMMODITY_TYPE.POWER]: {
            [this.SUBJECT_TYPE.INDIVIDUAL]: '/assets/pdfs/static/contract.pdf',
            [this.SUBJECT_TYPE.BUSINESSMAN]: '/assets/pdfs/static/contract.pdf',
        },
        [this.COMMODITY_TYPE.GAS]: {
            [this.SUBJECT_TYPE.INDIVIDUAL]: '/assets/pdfs/static/contract.pdf',
            [this.SUBJECT_TYPE.BUSINESSMAN]: '/assets/pdfs/static/smlouva2.pdf',
        },
    };

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
                if (!R.path([this.commodityType, this.subjectType], this.urlToPdfs)) {
                    this.router.navigate([ROUTES.ROUTER_NOT_FOUND]);
                }
            });
    }

    public routeToSubjectType = (evt, subjectType: SubjectTypeLowerCase) => {
        evt.preventDefault();
        this.subjectType = subjectType;
        this.navigateToCorrectUrl();
    }

    public routeToCommodityType = (evt, commodityType: CommodityTypesLowerCase) => {
        evt.preventDefault();
        this.commodityType = commodityType;
        this.navigateToCorrectUrl();
    }

    public navigateToCorrectUrl = () => {
        this.router.navigate([`${CONSTS.PATHS.PATTERNS_OF_CONTRACTS}/${this.commodityType}/${this.subjectType}`]);
    }
}
