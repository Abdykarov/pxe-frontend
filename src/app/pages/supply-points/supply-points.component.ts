import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    ISupplyPoint,
    ISupplyPointFindData,
} from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'lnd-supply-points',
    templateUrl: './supply-points.component.html',
    styleUrls: ['./supply-points.component.scss'],
})
export class SupplyPointsComponent extends AbstractComponent implements OnInit {

    public error = false;
    public errorMessages = [];
    public showSupplyPointDeleted = false;
    public supplierPoints: ISupplyPointFindData[];

    constructor(
        private cd: ChangeDetectorRef,
        private supplyService: SupplyService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();
        this.showSupplyPointDeleted = this.route.snapshot.queryParams.deletedSupplyPoint;

        this.supplyService.findSupplyPoints()
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

    public navigateToSupplyPointDetail = ({id}: ISupplyPoint) => {
        this.router.navigate(
            [id],
            {
                relativeTo: this.route,
            },
        );
    }
}
