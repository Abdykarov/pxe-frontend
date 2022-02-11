import { ITagConfigItem } from 'src/app/services/model/faq.model';
import { ISeo } from './seo';

export interface IFaq {
    title: string;
    breadcrumbTitle: string;
    seo: ISeo[];
    tag: ITagConfigItem[];
    order: number;
}
