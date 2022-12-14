import { IPersonalDataInputForm } from './personal-data.model';
import {
    IAddress,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from './supply.model';

export interface ISupplyPointImportInput {
    id?: string;
    address?: IAddress;
    contractEndTypeId?: string;
    expirationDate?: string;
    name?: string;
    supplyPointPowerAttributes?: ISupplyPointPowerAttributes;
    supplyPointGasAttributes?: ISupplyPointGasAttributes;
    subjectTypeId?: string;
    supplierId?: string;
    timeToContractEnd?: number;
    timeToContractEndPeriodId?: String;
    personalData?: IPersonalDataInputForm;
    importPricePerKwPowerVT?: number;
    importPricePerKwPowerNT?: number;
    importPricePerKwGas?: number;
    importPriceTotalPerYear?: number;
    importPermanentMonthlyPay?: number;
    withoutSupplier?: boolean;
}

export interface ISupplyPointPowerAttributesImport {
    ean: string;
    circuitBreakerId: string;
    phasesId: string;
    distributionRateId: string;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
}

export interface ISupplyPointGasAttributesImport {
    eic: string;
    annualConsumption: number;
}

export interface ISupplyPointImport {
    id: string;
    supplierId: string;
    name: string;
    address: IAddress;
    supplyPointPowerAttributes: ISupplyPointPowerAttributesImport;
    supplyPointGasAttributes: ISupplyPointGasAttributesImport;
    expirationDate: string;
    subjectTypeId: string;
    contractEndTypeId: string;
    timeToContractEnd: number;
    timeToContractEndPeriodId: string;
    personalData: IAddress;
    askForOfferId: string;
}
