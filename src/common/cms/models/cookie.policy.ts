import { ISeo } from './seo';

export interface ICookiePolicy {
    title: string;
    breadcrumbTitle: string;
    htmlContent: string;
    seo: ISeo[];
}
