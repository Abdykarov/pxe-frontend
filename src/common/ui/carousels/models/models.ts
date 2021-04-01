import { IDefaultCarouselItem } from 'src/common/ui/carousel/models/data.model';

export interface IReference extends IDefaultCarouselItem {
    reference: string;
    iconAlt: string;
    img: string;
    name: string;
    city: string;
}

export interface ISupplierCompare extends IDefaultCarouselItem {
    region: string;
    savingGas: number;
    savingPower: number;
}

export interface ISupplierLogo extends IDefaultCarouselItem {
    alt: string;
    logoUrl: string;
    faqUrl: string;
    title: string;
    width: number;
}

