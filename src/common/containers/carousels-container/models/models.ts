import { IDefaultCarouselItem } from 'src/common/ui/carousel/models/data.model';

export interface IReference extends IDefaultCarouselItem {
    title: string;
    iconUrl: string;
    name: string;
    city: string;
}
