import { ActivatedRoute } from '@angular/router';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { DetailContainerFacade } from './detail-container.facade';

const detailContainerFacadeFactory = (
    route: ActivatedRoute,
    supplyService: SupplyService
): DetailContainerFacade =>
    new DetailContainerFacade(
        route.snapshot.params['supplyPointId'],
        route.snapshot.params['contractId'],
        supplyService
    );

export const DetailContainerFacadeProvider = {
    provide: DetailContainerFacade,
    useFactory: detailContainerFacadeFactory,
    deps: [ActivatedRoute, SupplyService],
};
