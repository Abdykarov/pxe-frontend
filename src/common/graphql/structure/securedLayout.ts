import {
    INavigationChildItem,
    INavigationConfig,
} from 'src/common/ui/navigation/models/navigation.model';

export interface ISecuredLayout {
    navigationConfig: INavigationConfig;
    navigationItemOpened: INavigationChildItem;
    __typename: string;
}

