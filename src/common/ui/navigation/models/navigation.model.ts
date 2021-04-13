import { INavigationItemType } from 'src/app/app.constants';
import {
    ILoginProvider,
    IUserTypes,
} from 'src/app/services/model/auth.model';

export interface INavigationConfig extends Array<INavigationMenu> {}

export interface INavigationMenu extends Array<INavigationItem> {}

export interface INavigationItem {
    label: string;
    icon: string;
    url?: string;
    id?: string;
    badge?: string;
    class?: string;
    allowedLoginProviders?: ILoginProvider[];
    type?: INavigationItemType;
    children?: Array<INavigationChildItem>;
    __typename?: string;
}

export interface INavigationChildItem {
    url?: string;
    label: string;
    class?: string;
    __typename?: string;
}

export interface IMenuUser {
    navigationMenu: INavigationMenu;
    navigationMenuActions: INavigationMenu;
}

export interface IMenuByUserTypeMapping {
    [IUserTypes.CONTRACT_IMPORTER]: IMenuUser;
    [IUserTypes.SUPPLIER]: IMenuUser;
    [IUserTypes.CONSUMER]: IMenuUser;
}
