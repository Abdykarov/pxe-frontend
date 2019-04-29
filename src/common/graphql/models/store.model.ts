import {
    ICodelistMap,
    ISupplierSampleDocument,
    ISupplyPoint,
} from './supply.model';
import { ISecuredLayout } from './secured-layout.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

export interface ILocalStore {
    counter: ICounter;
    visibility: IVisibility;
    ui: IStoreUi;
}

export interface ICounter {
    counter: {
        current: number;
        __typename: string;
    };
}

export interface IVisibility {
    visiblity: {
        current: number;
        __typename: string;
    };
}

export interface IStoreUi {
    securedLayout: ISecuredLayout;
    showOverlay: boolean;
    getCodelistByType: ICodelistMap;
    findCodelistsByTypes: ICodelistMap;
    findAllSuppliers: ISupplier;
    findSupplierDocumentsByComodity: ISupplierSampleDocument;
    getSupplyElectricityPoint: ISupplyPoint;
    __typename: string;
}
