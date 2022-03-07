export interface IFooterNavigation extends Array<IFooterNavigationItem> {}

export interface IFooterNavigationItem {
    label: string;
    url: string;
    i18n: string;
}
