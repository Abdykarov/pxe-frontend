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
import { saveAs } from 'file-saver';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityTypesLowerCase,
    CONSTS,
    SEO,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import {
    historyColConfig,
    pdfFutureSetting,
    pdfOldSetting,
    pdfSetting,
} from 'src/app/pages/patterns-of-contracts/patterns-of-contracts.config';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    IPdfFileWithText,
    IPdfSetting,
} from 'src/app/pages/patterns-of-contracts/models/patterns-of-contracts.model';
import { PdfViewerComponent } from 'src/common/ui/pdf-viewer/pdf-viewer.component';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent extends AbstractComponent implements OnInit {

    @ViewChild('pxePdfViewer', { static: true })
    public pxePdfViewer: PdfViewerComponent;

    public breadcrumbItemsSimple: IBreadcrumbItems;

    public readonly COMMODITY_TYPE = CommodityTypesLowerCase;
    public readonly SUBJECT_TYPE = SubjectTypeLowerCase;

    public commodityType = this.COMMODITY_TYPE.POWER;
    public subjectType = this.SUBJECT_TYPE.INDIVIDUAL;

    public historyTableCols = historyColConfig;
    public pdfSetting = pdfSetting;
    public pdfSettingOld = null;

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

                this.pdfSettingOld =
                    R.map(
                        (setting: IPdfSetting<IPdfFileWithText>) => setting[this.subjectType][this.commodityType])
                    (this.pdfSettingOldSource);

                const pdfCurrentSetting = this.pdfSetting[this.subjectType][this.commodityType];
                this.pxePdfViewer.pdfSrc = pdfCurrentSetting.sourceUrl;
                this.pxePdfViewer.downloadFileName = pdfCurrentSetting.downloadName;
                this.pxePdfViewer.refresh();
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
        this.router.navigate([`${CONSTS.PATHS.PATTERNS_OF_CONTRACTS}/${this.subjectType}/${this.commodityType}`]);
    }

    public downloadPdf = (sourceUrl: string, name: string) => {
        saveAs(sourceUrl, name);
    }
}
