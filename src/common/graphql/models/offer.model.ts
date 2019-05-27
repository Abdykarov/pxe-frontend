import { ICodelistItem } from './supply.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

export interface ISupplyPointOffer {
    id: number;
    supplier: ISupplier;
    commodityType: string;
    name: string;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryLength: number;
    permanentPaymentPrice: number;
    benefits: string[];
    priceVT: number;
    priceNT: number;
    priceGas: number;
}

export interface IOffer {
    id: number;
    supplier: ISupplier;
    status: string;
    commodityType: string;
    name: string;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryTo: string;
    deliveryLength: number;
    distributionLocation: string;
    permanentPaymentPrice: number;
    subject: ICodelistItem;
    benefits: String[];
    priceVT: number;
    priceNT: number;
    distributionRate: ICodelistItem;
    circuitBreaker: ICodelistItem;
    priceGas: number;
    annualConsumption: ICodelistItem;
}

export interface IOfferInput {
    name: String;
    supplierId: number;
    validFrom: string;
    validTo: string;
    deliveryFrom: string;
    deliveryTo: string;
    deliveryLength: number;
    distributionLocation: string;
    permanentPaymentPrice: number;
    subject: string;
    benefits: string[];
    powerAttributes: IOfferInputPowerAttributes;
    gasAttributes: IOfferInputGasAttributes;
}

export interface IOfferInputPowerAttributes {
    priceVT: number;
    priceNT: number;
    distributionRate: string;
    circuitBreaker: string;
}

export interface IOfferInputGasAttributes {
    price: number;
    annualConsumption: string;
}

