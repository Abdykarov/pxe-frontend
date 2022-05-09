import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { DetailContainerFacade } from 'src/common/containers/supply-point-detail/detail-container.facade';
import { ApiService } from 'src/common/containers/supply-point-detail/services/api.service';
import { ContractActionsService } from 'src/common/containers/supply-point-detail/services/contract-actions.service';
import { UtilsService } from 'src/common/containers/supply-point-detail/services/utils.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

const detailContainerFacadeFactory = (
    route: ActivatedRoute,
    supplyService: SupplyService,
    contractActionsService: ContractActionsService,
    utilsService: UtilsService,
    crudService: ApiService,
    documentService: DocumentService,
    router: Router
): DetailContainerFacade =>
    new DetailContainerFacade(
        route.snapshot.params['supplyPointId'],
        route.snapshot.params['contractId'],
        supplyService,
        contractActionsService,
        utilsService,
        crudService,
        router,
        documentService
    );

export const DetailContainerFacadeProvider = {
    provide: DetailContainerFacade,
    useFactory: detailContainerFacadeFactory,
    deps: [
        ActivatedRoute,
        SupplyService,
        ContractActionsService,
        UtilsService,
        ApiService,
        DocumentService,
        Router,
    ],
};
