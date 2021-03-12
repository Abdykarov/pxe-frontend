import { ISeo } from './seo';

export interface IType {
    label: string;
    title: string;
    url: string;
}

export interface IArticle {
    url: string;
    type: IType[];
    header: string;
    oneOfMostVisited: string;
    content: string;
}

export interface IBlog {
    title: string;
    breadcrumbTitle: string;
    articles: IArticle[];
    seo: ISeo[];
}
