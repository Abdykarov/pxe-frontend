import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    Optional,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
    CommodityTypesCsLowerCase,
    CONSTS,
    IS_PRERENDER_PROVIDER,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { IPdfSetting } from 'src/app/pages/public/patterns-of-contracts/models/patterns-of-contracts.model';
import {
    historyColConfig,
    pdfSetting,
} from 'src/app/pages/public/patterns-of-contracts/patterns-of-contracts.config';
import { AbstractComponent } from 'src/common/abstract.component';
import { IPatternsOfContracts } from 'src/common/cms/models/patterns-of-contracts';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { PdfViewerComponent } from 'src/common/ui/pdf-viewer/pdf-viewer.component';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './patterns-of-contracts.component.html',
    styleUrls: ['./patterns-of-contracts.component.scss'],
})
export class PatternsOfContractsComponent
    extends AbstractComponent
    implements OnInit
{
    public readonly patternsOfContracts: IPatternsOfContracts =
        this.route.snapshot.data.patternsOfContracts;
    public readonly breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: this.patternsOfContracts.breadcrumbTitle,
        },
    ];

    @ViewChild('pxePdfViewer', { static: true })
    public pxePdfViewer: PdfViewerComponent;

    public readonly COMMODITY_TYPE = CommodityTypesCsLowerCase;
    public readonly SUBJECT_TYPE = SubjectTypeLowerCase;

    public commodityType = this.COMMODITY_TYPE.POWER;
    public subjectType = this.SUBJECT_TYPE.INDIVIDUAL;

    public readonly isClientRendering = isPlatformBrowser(this.platformId);

    public historyTableCols = historyColConfig;
    public pdfSettings = pdfSetting;
    public pdfActiveContracts = null;
    public pdfOldContracts = null;
    public pdfFutureContracts = null;

    constructor(
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        @Inject(PLATFORM_ID) private platformId: string,
        @Optional() @Inject(IS_PRERENDER_PROVIDER) private isPrerender: boolean
    ) {
        super();
        const seo = R.head(this.patternsOfContracts.seo);

        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
        });
    }

    public defaultValueInPrerender(value: string, defaultValue: string): any {
        if (!value && this.isPrerender) {
            return defaultValue;
        }
        return value;
    }

    ngOnInit(): void {
        combineLatest([this.route.params, this.route.fragment])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([params, fragment]) => {
                this.subjectType = this.defaultValueInPrerender(
                    params.subjectType,
                    this.SUBJECT_TYPE.INDIVIDUAL
                );
                const tree = this.router.parseUrl(this.router.url);
                this.commodityType = this.defaultValueInPrerender(
                    tree.fragment,
                    CommodityTypesCsLowerCase.POWER
                );

                this.prepareActiveContract();
                this.prepareFutureContracts();
                this.prepareOldContracts();

                if (
                    !R.path(
                        [this.subjectType, this.commodityType],
                        this.pdfActiveContracts
                    ) &&
                    !this.isPrerender
                ) {
                    this.commodityType = this.COMMODITY_TYPE.POWER;
                    this.subjectType = this.SUBJECT_TYPE.INDIVIDUAL;
                    this.navigateToCorrectUrl();
                    return;
                }

                if (this.isClientRendering) {
                    const pdfCurrentSetting =
                        this.pdfActiveContracts[this.subjectType][
                            this.commodityType
                        ];
                    this.pxePdfViewer.pdfSrc = pdfCurrentSetting.sourceUrl;
                    this.pxePdfViewer.downloadFileName =
                        pdfCurrentSetting.downloadName;

                    setTimeout((_) => {
                        this.pxePdfViewer.refresh();
                        this.cd.markForCheck();
                    });
                }
            });
    }

    public routeToSubjectType(evt, subjectType: SubjectTypeLowerCase): void {
        evt.preventDefault();
        this.subjectType = subjectType;
        this.navigateToCorrectUrl();
    }

    public routeToCommodityType(
        evt,
        commodityType: CommodityTypesCsLowerCase
    ): void {
        evt.preventDefault();
        this.commodityType = commodityType;
        this.navigateToCorrectUrl();
    }

    public navigateToCorrectUrl(): void {
        this.router.navigate(
            [`${CONSTS.PATHS.PATTERNS_OF_CONTRACTS}/${this.subjectType}`],
            {
                fragment: this.commodityType,
            }
        );
    }

    public downloadPdf(sourceUrl: string, name: string): void {
        saveAs(sourceUrl, name);
    }

    public prepareOldContracts(): void {
        this.pdfOldContracts = R.pipe(
            R.filter((setting: IPdfSetting) => {
                const { dateTo, dateFrom } =
                    setting[this.SUBJECT_TYPE.INDIVIDUAL][
                        this.COMMODITY_TYPE.POWER
                    ];
                const now = new Date().getTime();
                const tomorrowFromDateTo = new Date(
                    dateTo.getTime() + 24 * 60 * 60 * 1000
                ).getTime();
                return dateFrom.getTime() < now && tomorrowFromDateTo < now;
            }),
            R.map(
                (setting: IPdfSetting) =>
                    setting[this.subjectType][this.commodityType]
            )
        )(this.pdfSettings);
    }

    public prepareActiveContract(): void {
        this.pdfActiveContracts = R.pipe(
            R.filter((setting: IPdfSetting) => {
                const { dateFrom, dateTo } =
                    setting[this.SUBJECT_TYPE.INDIVIDUAL][
                        this.COMMODITY_TYPE.POWER
                    ];

                const now = new Date().getTime();
                const tomorrowFromDateTo = new Date(
                    dateTo.getTime() + 24 * 60 * 60 * 1000
                ).getTime();
                return dateFrom.getTime() <= now && now < tomorrowFromDateTo;
            }),
            R.head
        )(this.pdfSettings);
    }

    public prepareFutureContracts(): void {
        this.pdfFutureContracts = R.filter((setting: IPdfSetting) => {
            const { dateTo, dateFrom } =
                setting[this.SUBJECT_TYPE.INDIVIDUAL][
                    this.COMMODITY_TYPE.POWER
                ];
            const now = new Date().getTime();
            return dateTo.getTime() > now && dateFrom.getTime() > now;
        })(this.pdfSettings);
    }
}
