import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CONSTS, TIME_TO_CONTRACT_END_PERIOD_MAP } from 'src/app/app.constants';
import { ContractActions } from 'src/app/pages/consumers/supply-points-overview/models/supply-point-detail.model';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentType } from 'src/app/services/model/document.model';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { DetailContainerFacade } from 'src/common/containers/supply-point-detail/detail-container.facade';
import { DetailContainerFacadeProvider } from 'src/common/containers/supply-point-detail/detail-container.provider';
import { ApiService } from 'src/common/containers/supply-point-detail/services/api.service';
import { ContractActionsService } from 'src/common/containers/supply-point-detail/services/contract-actions.service';
import { SupplyPointFactoryService } from 'src/common/containers/supply-point-detail/services/supply-point-factory.service';
import { UtilsService } from 'src/common/containers/supply-point-detail/services/utils.service';
import { VerificationFactoryService } from 'src/common/containers/supply-point-detail/services/verification-factory.service';
import {
    AllowedOperations,
    CommodityType,
    ISupplyPoint,
    ProgressStatus,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-detail-container',
    templateUrl: './detail-container.component.html',
    styleUrls: ['./detail-container.component.scss'],
    providers: [
        ContractActionsService,
        UtilsService,
        ApiService,
        DetailContainerFacadeProvider,
        VerificationFactoryService,
        SupplyPointFactoryService,
    ],
})
export class DetailContainerComponent {
    public readonly allowedOperations = AllowedOperations;
    public readonly contractActions = ContractActions;
    public readonly fieldError$ = this.detailContainerFacade.fieldError$;
    public readonly globalError$ = this.detailContainerFacade.globalError$;
    public readonly restoreContractAction =
        this.detailContainerFacade.restoreContractAction;
    public readonly supplyPoint$ = this.detailContainerFacade.supplyPointData$;
    public readonly isLoading$ = this.detailContainerFacade.isLoading$;
    public readonly today = moment().startOf('days');
    public readonly documentType = DocumentType;
    public readonly saveDocument = this.detailContainerFacade.saveDocument;
    public readonly activeContractAction$ =
        this.detailContainerFacade.activeContractActionSubject$;
    public readonly changeActiveContractAction =
        this.detailContainerFacade.changeActiveContractAction;
    public readonly submitVerification = (
        smsCode: string,
        supplyPoint: ISupplyPoint
    ) =>
        this.detailContainerFacade.submitVerification(
            smsCode,
            supplyPoint,
            this.contractActionsWrapper,
            this.supplyPointDetailForm
        );
    public readonly sendContractConfirmationSms = (contractId: string) =>
        this.detailContainerFacade.sendContractConfirmationSms(contractId);
    public readonly updateSupplyPoint =
        this.detailContainerFacade.updateSupplyPoint;
    public readonly smsSent$ = this.detailContainerFacade.smsSentSubject$;
    public readonly formSent$ = this.detailContainerFacade.formSent$;
    public readonly formFields = formFields(
        this.authService.currentUserValue.testingAccount
    );
    public readonly downloadPdf = this.detailContainerFacade.downloadPdf;
    public readonly formLoading$ = this.detailContainerFacade.formLoading$;
    public readonly nextSupplyPoint$ =
        this.detailContainerFacade.nextSupplyPoint$;
    public readonly CommodityType = CommodityType;
    public readonly documentLoading$ =
        this.detailContainerFacade.documentLoadingSubject$;

    public contractActionsWrapper: ElementRef;
    public timeToContractEnd = CONSTS.TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS;
    public timeToContractEndPeriod = TimeToContractEndPeriod.DAY;
    public timeToContractEndPeriodMap = TIME_TO_CONTRACT_END_PERIOD_MAP;

    @ViewChild('contractActionsWrapper') set content(
        contractActionsWrapper: ElementRef
    ) {
        if (contractActionsWrapper) {
            this.contractActionsWrapper = contractActionsWrapper;
        }
    }

    @ViewChild('supplyPointDetailForm')
    public supplyPointDetailForm: SupplyPointFormComponent;

    constructor(
        private detailContainerFacade: DetailContainerFacade,
        public router: Router,
        private authService: AuthService,
        private navigateConsumerService: NavigateConsumerService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    public cancelUpdate = () =>
        this.navigateConsumerService.navigateToSupplyPoints();

    public routerToNextContract = (isNextContractConcluded: boolean) => {
        const nextSupplyPoint = this.nextSupplyPoint$.getValue();
        if (isNextContractConcluded) {
            this.navigateConsumerService.navigateToSupplyPointDetail(
                nextSupplyPoint.id,
                nextSupplyPoint.contract.contractId
            );
        } else {
            this.navigateConsumerService.checkCorrectStep(
                nextSupplyPoint,
                ProgressStatus.COMPLETED
            );
        }
    };
}
