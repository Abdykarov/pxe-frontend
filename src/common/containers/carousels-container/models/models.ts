import { IDefaultCarouselItem } from 'src/common/ui/carousel/models/data.model';

export interface IReference extends IDefaultCarouselItem {
    title: string;
    iconAlt: string;
    iconUrl: string;
    name: string;
    city: string;
}

export interface ISupplierCompare extends IDefaultCarouselItem {
    region: string;
    saving: number;
}

export interface ISupplierLogo extends IDefaultCarouselItem {
    alt: string;
    logoUrl: string;
    title: string;
    width: number;
}

