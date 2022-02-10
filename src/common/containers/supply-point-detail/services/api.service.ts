import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { SupplyPointFactoryService } from 'src/common/containers/supply-point-detail/services/supply-point-factory.service';
import { VerificationFactoryService } from 'src/common/containers/supply-point-detail/services/verification-factory.service';
import {
    ISupplyPoint,
    ISupplyPointFormData,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { DocumentService } from 'src/common/services/document.service';
import {
    DocumentType,
    IResponseDataDocument,
} from 'src/common/services/model/document.model';

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
        formSent$: BehaviorSubject<boolean>
    ): Function {
        return () => {
            this.verificationService.processSuccessVerificationResult(
                result,
                globalErrorSubject$,
                formSent$
            );
        };
    }

    public sendContractConfirmationSms(contractId: string) {
        return this.contractService.sendContractConfirmationSms(contractId);
    }

    public updateSupplyForm(supplyPointFormData: ISupplyPointFormData) {
        return this.supplyPointFactoryService.updateSupplyPointDetail(
            supplyPointFormData
        );
    }
}
