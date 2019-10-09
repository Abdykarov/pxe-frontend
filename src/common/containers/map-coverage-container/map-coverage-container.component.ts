import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';
import {
    parseGraphQLErrors,
    scrollToElementFnc,
} from 'src/common/utils';

@Component({
    selector: 'pxe-map-coverage-container',
    templateUrl: './map-coverage-container.component.html',
    styleUrls: ['./map-coverage-container.component.scss'],
})
export class MapCoverageContainerComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public configCoverage: IMapCoverageConfig;
    public loadingData = true;

    @ViewChild('pxeMapCoverageWrapper')
    public pxeMapCoverageWrapper: ElementRef;

    constructor(
        private cd: ChangeDetectorRef,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.supplyService.getSupplyPointGlobalStatistics()
            .pipe(
                map(({data}) => data.getSupplyPointGlobalStatistics),
                takeUntil(this.destroy$),
            ).subscribe(
                (configCoverage: IMapCoverageConfig) => {
                    this.globalError = [];
                    this.loadingData = false;
                    this.configCoverage = configCoverage;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.loadingData = false;
                    scrollToElementFnc(this.pxeMapCoverageWrapper.nativeElement);
                    this.cd.markForCheck();
                },
            );
    }
}
