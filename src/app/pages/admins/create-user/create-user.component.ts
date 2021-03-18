import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import * as R from 'ramda';
import { Observable } from 'rxjs';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CreateUserFacade } from './create-user.facade';
import {
    getConfigStepper,
    TypeStepper,
} from 'src/common/utils';
import { IMicroTableData } from 'src/common/ui/micro-table/micro-table/item.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';

@Component({
    selector: 'pxe-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends AbstractComponent {
    public supplyPointsImport$: Observable<ISupplyPoint[]> = null;
    public supplyPointsImportMicroTableData$: Observable<IMicroTableData[]> = null;

    public askForOfferId = null;
    public title: string = null;
    public configStepper: IStepperProgressItem[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public createUserFacade: CreateUserFacade,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    if (this.supplyPointsImport$ === null) {
                        const askForOfferId = this.route.snapshot.firstChild.queryParams['askForOfferId'];
                        this.askForOfferId = askForOfferId;
                        this.supplyPointsImport$ = this.createUserFacade.findSupplyPointImports$(askForOfferId);
                        this.setActiveAskForOfferId(askForOfferId);
                        this.setSupplyPointsImportMicroTableData$();
                    }
                    const step = this.route.snapshot.firstChild.data['step'];
                    this.title = this.route.snapshot.firstChild.data['title'];
                    this.configStepper = getConfigStepper(step, false, TypeStepper.CREATE_USER);
                }
            });
    }

    public setSupplyPointsImportMicroTableData$() {
        this.supplyPointsImportMicroTableData$ = this.supplyPointsImport$.pipe(
            map(
                R.map((supplyPoint: ISupplyPoint) => ({id: supplyPoint.id, label: supplyPoint.name || supplyPoint.identificationNumber })),
            ),
        );
    }

    public setActiveAskForOfferId(askForOfferId: string) {
        console.log(askForOfferId);
        this.supplyPointImportService.setActiveAskForOfferId(askForOfferId).pipe(
            takeUntil(this.destroy$),
        ).subscribe();
    }

    public deleteSupplyPointImport(supplyPointImportId: string) {
        this.supplyPointImportService.deleteSupplyPointImportMutation(supplyPointImportId, this.askForOfferId).pipe(
            takeUntil(this.destroy$),
        ).subscribe();
    }
}
