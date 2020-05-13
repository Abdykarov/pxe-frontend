import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityTypesLowerCase,
    CONSTS,
    SEO,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IPdfSetting } from './patterns-of-contracts.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent extends AbstractComponent implements OnInit {
    @ViewChild('ng2PdfJsViewer')
    public ng2PdfJsViewer: PdfJsViewerComponent;

    public breadcrumbItemsSimple: IBreadcrumbItems;

    public readonly COMMODITY_TYPE = CommodityTypesLowerCase;
    public readonly SUBJECT_TYPE = SubjectTypeLowerCase;

    public commodityType = this.COMMODITY_TYPE.POWER;
    public subjectType = this.SUBJECT_TYPE.INDIVIDUAL;
    public loading = true;

    public pdfSetting: IPdfSetting = {
        [this.SUBJECT_TYPE.INDIVIDUAL]: {
            [this.COMMODITY_TYPE.POWER]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-power-fo.pdf',
                downloadName: 'Vzorová smlouva domácnost - elektřina',
            },
            [this.COMMODITY_TYPE.GAS]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-gas-fo.pdf',
                downloadName: 'Vzorová smlouva domácnost - plyn',
            },
        },
        [this.SUBJECT_TYPE.BUSINESSMAN]: {
            [this.COMMODITY_TYPE.POWER]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-power-po.pdf',
                downloadName: 'Vzorová smlouva firma - elektřina',
            },
            [this.COMMODITY_TYPE.GAS]: {
                sourceUrl: '/assets/pdfs/patterns-of-contracts/contract-gas-po.pdf',
                downloadName: 'Vzorová smlouva firma - plyn',
            },
        },
    };

    constructor(
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) {
        super();
        this.titleService.setTitle(CONSTS.TITLES.PATTERNS_OF_CONTRACTS);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.PATTERNS_OF_CONTRACTS,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.PATTERNS_OF_CONTRACTS,
            ].toString(),
        });

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
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.subjectType = params.subjectType;
                this.commodityType = params.commodityType;
                if (!R.path([this.subjectType, this.commodityType], this.pdfSetting)) {
                    this.commodityType = this.COMMODITY_TYPE.POWER;
                    this.subjectType = this.SUBJECT_TYPE.INDIVIDUAL;
                    this.navigateToCorrectUrl();
                    return;
                }
                const pdfCurrentSetting = this.pdfSetting[this.subjectType][this.commodityType];
                this.ng2PdfJsViewer.pdfSrc = pdfCurrentSetting.sourceUrl;
                this.ng2PdfJsViewer.downloadFileName = pdfCurrentSetting.downloadName;
                this.ng2PdfJsViewer.refresh();
                this.cd.markForCheck();
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
        this.router.navigate(
            [
                `${CONSTS.PATHS.PATTERNS_OF_CONTRACTS}/${this.subjectType}/${this.commodityType}`,
            ]);
    }
}
