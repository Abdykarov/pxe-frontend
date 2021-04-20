import { ISeo } from './seo';
import { ITagConfigItem } from 'src/app/services/model/faq.model';

export interface IFaq {
    title: string;
    breadcrumbTitle: string;
    seo: ISeo[];
    tag: ITagConfigItem[];
    order: number;
}
