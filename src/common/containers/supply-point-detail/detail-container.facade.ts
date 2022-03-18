import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponse } from '@apollo/client/link/error';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { ContractActions } from 'src/app/pages/consumers/supply-points-overview/models/supply-point-detail.model';
import { DocumentService } from 'src/app/services/document.service';
import {
    DocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { AbstractFacade } from 'src/common/abstract.facade';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { ApiService } from 'src/common/containers/supply-point-detail/services/api.service';
import { ContractActionsService } from 'src/common/containers/supply-point-detail/services/contract-actions.service';
import { UtilsService } from 'src/common/containers/supply-point-detail/services/utils.service';
import {
    ISupplyPoint,
    ISupplyPointFormData,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { isDataAvailable, scrollToElementFnc } from 'src/common/utils';

@Injectable()
export class DetailContainerFacade extends AbstractFacade {
    public readonly smsSentSubject$ = new BehaviorSubject<number>(null);
    public readonly documentLoadingSubject$ = new BehaviorSubject(false);
    public readonly formLoading$ = new BehaviorSubject<boolean>(false);
    public readonly formSent$ = new BehaviorSubject(false);

    public readonly activeContractActionSubject$ =
        this.contractActionsService.activeContractActionSubject$;

    public readonly nextSupplyPoint$ = new BehaviorSubject(null);

    public readonly supplyPoint$ = this.supplyPointService
        .getSupplyPoint(this.supplyPointId, this.contractId, true, false)
        .pipe(this.catchError);

    public readonly supplyPointData$: Observable<ISupplyPoint> =
        this.supplyPoint$.pipe(
            filter(isDataAvailable),
            map(({ data }) => data.getSupplyPoint),
            tap((supplyPoint: ISupplyPoint) => {
                if (supplyPoint?.contract?.nextContractId) {
                    this.supplyPointService
                        .getSupplyPoint(
                            this.supplyPointId,
                            supplyPoint.contract.nextContractId
                        )
                        .pipe(map(({ data }) => data.getSupplyPoint))
                        .subscribe((nextSupplyPoint) => {
                            this.nextSupplyPoint$.next(nextSupplyPoint);
                        });
                }
            })
        );

    public readonly isLoading$: Observable<boolean> = this.createIsLoading(
        this.supplyPoint$
    );

    public submitVerification = (
        smsCode: string,
        supplyPoint: ISupplyPoint,
        contractActionsWrapper: ElementRef,
        supplyPointDetailForm: SupplyPointFormComponent
    ): void => {
        this.formLoading$.next(true);
        this.apiService
            .submitVerification(smsCode, supplyPoint, supplyPointDetailForm)
            .subscribe(
                (result: boolean) =>
                    this.apiService.processSuccessVerificationResult(
                        result,
                        this.globalErrorSubject$,
                        this.formSent$
                    ),
                (error: ErrorResponse) => {
                    this.processError(error);
                    if (
                        Object.keys(this.fieldErrorSubject$.getValue()).length
                    ) {
                        scrollToElementFnc(
                            contractActionsWrapper.nativeElement
                        );
                    }
                }
            )
            .add(() => {
                this.formLoading$.next(false);
            });
    };

    public restoreContractAction = (evt, supplyPointCopy: ISupplyPoint) =>
        this.utilsService.restoreContractAction(evt, supplyPointCopy);

    public changeActiveContractAction = (contractAction: ContractActions) => {
        this.contractActionsService.changeActiveContractAction(contractAction);
    };

    public saveDocument = (contractId: string, documentType: DocumentType) => {
        this.documentLoadingSubject$.next(true);
        this.apiService
            .saveDocument(contractId, documentType)
            .subscribe((responseDataDocument: IResponseDataDocument) => {
                this.documentService.documentSave(responseDataDocument);
            }, this.processRestError)
            .add(() => {
                this.documentLoadingSubject$.next(false);
            });
    };

    public sendContractConfirmationSms = (contractId: string) => {
        this.formLoading$.next(true);
        this.apiService
            .sendContractConfirmationSms(contractId)
            .subscribe(
                () => this.smsSentSubject$.next(new Date().getTime()),
                this.processError
            )
            .add(() => {
                this.formLoading$.next(false);
            });
    };

    public updateSupplyPoint = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading$.next(true);
        this.apiService
            .updateSupplyForm(supplyPointFormData)
            .subscribe(() => {
                scrollToElementFnc('top');
                this.formSent$.next(true);
                setTimeout(() => {
                    this.formSent$.next(false);
                }, CONSTS.TIME_TO_SHOW_FLASH_MESSAGES);
            }, this.processError)
            .add(() => {
                this.formLoading$.next(false);
            });
    };

    protected override processError(error: ErrorResponse): void {
        super.processError(error);
        this.formLoading$.next(false);
        this.documentLoadingSubject$.next(false);
        this.formSent$.next(false);
    }

    public downloadPdf = (contractId: string) => {
        this.formLoading$.next(true);
        this.documentService
            .getDocument(contractId, DocumentType.CONTRACT)
            .subscribe(this.documentService.documentSave, this.processRestError)
            .add(() => {
                this.formLoading$.next(false);
            });
    };

    constructor(
        protected supplyPointId: string,
        protected contractId: string,
        protected supplyPointService: SupplyService,
        private contractActionsService: ContractActionsService,
        private utilsService: UtilsService,
        private apiService: ApiService,
        private router: Router,
        private documentService: DocumentService
    ) {
        super();
    }
}
