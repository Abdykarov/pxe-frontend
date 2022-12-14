import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import {
    DocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { SupplyPointFactoryService } from 'src/common/containers/supply-point-detail/services/supply-point-factory.service';
import { VerificationFactoryService } from 'src/common/containers/supply-point-detail/services/verification-factory.service';
import {
    ISupplyPoint,
    ISupplyPointFormData,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';

@Injectable()
export class ApiService {
    constructor(
        private contractService: ContractService,
        private documentService: DocumentService,
        private supplyPointFactoryService: SupplyPointFactoryService,
        private verificationService: VerificationFactoryService
    ) {}

    public saveDocument(
        contractId: string,
        documentType: DocumentType
    ): Observable<IResponseDataDocument> {
        return this.documentService.getDocument(contractId, documentType);
    }

    public submitVerification(
        smsCode: string,
        supplyPoint: ISupplyPoint,
        supplyPointDetailForm: SupplyPointFormComponent
    ): Observable<any> {
        return this.verificationService.verificationFactory(
            smsCode,
            supplyPoint,
            supplyPointDetailForm
        );
    }

    public processSuccessVerificationResult(
        result: boolean,
        globalErrorSubject$: BehaviorSubject<string[]>,
        formSent$: BehaviorSubject<boolean>,
        smsSentSubject$: BehaviorSubject<number>
    ): void {
        this.verificationService.processSuccessVerificationResult(
            result,
            globalErrorSubject$,
            formSent$,
            smsSentSubject$
        );
    }

    public sendContractConfirmationSms(contractId: string): Observable<any> {
        return this.contractService.sendContractConfirmationSms(contractId);
    }

    public updateSupplyForm(
        supplyPointFormData: ISupplyPointFormData
    ): Observable<any> {
        return this.supplyPointFactoryService.updateSupplyPointDetail(
            supplyPointFormData
        );
    }
}
