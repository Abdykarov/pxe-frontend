import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CreateUserFacade } from './create-user.facade';
import {
    getConfigStepper,
    TypeStepper,
} from 'src/common/utils';
import { ISupplyPointImport } from 'src/common/graphql/models/supply-point-import.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';

@Component({
    selector: 'pxe-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends AbstractComponent {
    public supplyPointsImport$: Observable<any[]> = null;

    public title: string = null;
    public configStepper: IStepperProgressItem[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private createUserFacade: CreateUserFacade,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        super();
        this.supplyPointImportService.getActiveAskForOfferIdQuery().subscribe(_ => console.log(_));
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    if (this.supplyPointsImport$ === null) {
                        const askForOfferId = this.route.snapshot.firstChild.queryParams['askForOfferId'];
                        this.supplyPointsImport$ = this.createUserFacade.findSupplyPointImports$(askForOfferId);
                        this.setActiveAskForOfferId(askForOfferId);
                    }
                    const step = this.route.snapshot.firstChild.data['step'];
                    this.title = this.route.snapshot.firstChild.data['title'];
                    this.configStepper = getConfigStepper(step, false, TypeStepper.CREATE_USER);
                }
            });
    }

    public setActiveAskForOfferId(askForOfferId: string) {
        this.supplyPointImportService.setActiveAskForOfferId(askForOfferId).pipe(
            takeUntil(this.destroy$),
        ).subscribe();
    }
}
