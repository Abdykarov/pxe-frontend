export interface IQuestion {
    id: number;
    tag: ITagConfigItem;
    url: string;
    header: string;
    shortContent: string;
    fullContent?: string;
    oneOfMostVisited?: boolean;
    seoKeywords?: string;
    vatNumber?: string;
    isTestData?: boolean;
    absoluteUrl?: string[];
}

export enum Tag {
    GENERAL = 'general',
    SUPPLIER = 'supplier',
}

export interface ITagConfigItem {
    type: string | Tag;
    url: string;
    label: string;
    title: string;
}
