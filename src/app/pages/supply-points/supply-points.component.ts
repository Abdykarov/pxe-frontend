import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'lnd-supply-points',
    templateUrl: './supply-points.component.html',
    styleUrls: ['./supply-points.component.scss'],
})
export class SupplyPointsComponent extends AbstractComponent implements OnInit {

    public supplierPoints: ISupplyPointFindData[];
    public error = false;
    public errorMessages = [];

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private supplyService: SupplyService,
        private router: Router,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();
        const email = this.authService.currentUserValue.email;
        this.supplyService.findSupplyPoints(email)
            .pipe(
                takeUntil(this.destroy$),
                map( res => this.transportResponseToData(res)),
            ).subscribe(
                (response: ISupplyPointFindData[]) => {
                    this.supplierPoints = response;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.error = true;
                    const { globalError } = parseGraphQLErrors(error);
                    this.errorMessages = globalError;
                    this.cd.markForCheck();
                });
    }

    private transportResponseToData = ({data}): ISupplyPointFindData[] => {
        return data.findSupplyPoints;
    }

    public createSupplyPoint = (event) => {
        event.stopPropagation();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }

}
