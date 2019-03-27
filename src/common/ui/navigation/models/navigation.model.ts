
export interface INavigationConfig extends Array<INavigationMenu> {}

export interface INavigationMenu extends Array<INavigationItem> {}

export interface INavigationItem {
    label: string;
    icon: string;
    url?: string;
    id?: string;
    badge?: string;
    children?: Array<INavigationChildItem>;
}

export interface INavigationChildItem {
    url?: string;
    label: string;
}
