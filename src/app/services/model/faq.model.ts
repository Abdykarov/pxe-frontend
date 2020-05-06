export interface IQuestion {
    id: number;
    tag: Tag;
    url: string;
    header: string;
    shortContent: string;
    fullContent?: string;
    oneOfMostVisited?: boolean;
    seoDescription?: string;
    seoKeywords?: string;
}

export enum Tag {
    GENERAL = 'general',
    SUPPLIER = 'supplier',
}

export interface ITagConfigItem {
    type: Tag;
    url: string;
    label: string;
}
