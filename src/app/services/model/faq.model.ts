export interface IQuestion {
    id: number;
    tag: Tag;
    url: string;
    header: string;
    shortContent: string;
    fullContent?: string;
    oneOfMostVisited?: boolean;
    seoKeywords?: string;
    vatNumber?: string;
    isTestData?: boolean;
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
