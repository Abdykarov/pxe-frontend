import { ISeo } from './seo';

export interface IType {
    label: string;
    title: string;
    url: string;
    seo: ISeo[];
    order: number;
}

export interface IArticlesWithTotals {
    items: IArticle[];
    total: number;
}

export interface IArticle {
    url: string;
    type: IType[];
    header: string;
    oneOfMostVisited: string;
    content?: string;
    shortContent?: string;
    img: string;
    date: string;
    seo: ISeo[];
}

export interface IBlog {
    total: number;
    articles: IArticle[];
    types: IType[];
}
