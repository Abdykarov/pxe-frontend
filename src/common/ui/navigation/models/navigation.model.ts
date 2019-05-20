
export interface INavigationConfig extends Array<INavigationMenu> {}

export interface INavigationMenu extends Array<INavigationItem> {}

export interface INavigationItem {
    label: string;
    icon: string;
    url?: string;
    id?: string;
    badge?: string;
    class?: string;
    children?: Array<INavigationChildItem>;
    __typename?: string;
}

export interface INavigationChildItem {
    url?: string;
    label: string;
    class?: string;
    __typename?: string;
}
