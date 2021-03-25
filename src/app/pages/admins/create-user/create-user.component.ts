import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import * as R from 'ramda';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CreateUserFacade } from './create-user.facade';
import {
    getConfigStepper,
    TypeStepper,
} from 'src/common/utils';
import { IMicroTableData } from 'src/common/ui/micro-table/micro-table/item.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends AbstractComponent {
    public supplyPointsImport$: Observable<ISupplyPoint[]> = null;
    public supplyPointsImportMicroTableData$: Observable<IMicroTableData[]> = null;
    public title: string = null;

    public configStepper: IStepperProgressItem[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public createUserFacade: CreateUserFacade,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    const {
                        askForOfferId,
                        email,
                        supplyPointId = null,
                    } = this.route.snapshot.firstChild.queryParams;

                    if (askForOfferId) {
                        if (!supplyPointId) {
                            this.createUserFacade.setActiveSupplyPoint(null);
                        }

                        const isNewSupplyPoint = R.path(['history', 'state', 'isNewSupplyPoint'], window);

                        const [
                            supplyPointsImport$,
                            supplyPointsImportMicroTableData$,
                        ] = this.createUserFacade.setObservableByQueryParams$(
                            askForOfferId,
                            supplyPointId,
                            email,
                            isNewSupplyPoint,
                        );
                        this.supplyPointsImport$ = <Observable<ISupplyPoint[]>>supplyPointsImport$;
                        this.supplyPointsImportMicroTableData$ = <Observable<IMicroTableData[]>>supplyPointsImportMicroTableData$;
                    } else {
                        this.router.navigate([this.ROUTES.ROUTER_ASK_FOR_OFFER_PROCESSED]);
                    }
                    const step = this.route.snapshot.firstChild.data['step'];
                    this.title = this.route.snapshot.firstChild.data['title'];
                    this.configStepper = getConfigStepper(step, false, TypeStepper.CREATE_USER);
                }
            });
    }

    public editSupplyPoint(supplyPointId: string) {
        this.createUserFacade.setActiveSupplyPoint(null);
        this.router.navigate([this.ROUTES.ROUTER_ASK_FOR_OFFER]).then( _ => {
            this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT], {
                queryParams: {
                    askForOfferId: this.createUserFacade.getAskForOfferId(),
                    email: this.createUserFacade.getEmail(),
                    supplyPointId,
                },
            });
        });
    }

    public deleteSupplyPointImport(supplyPoint: ISupplyPoint) {
        this.createUserFacade.confirmDeleteSupplyPointImport(supplyPoint);
    }
}
