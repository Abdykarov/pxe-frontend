
export interface ITableColumnViewConfig {
    showIn?: Array<string>;
    headingClass?: Array<string>;
    cellClass?: Array<string>;
    content?: (row: any) => string;
    contentTemplateName?: string;
}

export interface ITableColumnConfig {
    label?: string;
    views: Array<ITableColumnViewConfig>;
    mobileViews?: Array<ITableColumnViewConfig>;
}
