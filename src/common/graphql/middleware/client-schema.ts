import {gql} from 'apollo-angular';


export const clientSchema = gql`
    extend type Query {
        ui: StoreUi!
    }

    type StoreUi {
        securedLayout: [SecuredLayout]!
        showOverlay: Boolean!
    }

    type SecuredLayout {
        navigationConfig: [NavigationConfig]!
        navigationItemOpened: NavigationChildItem!
    }

    type NavigationConfig {
        label: String
        icon: String
        url: String
        id: String
        badge: String
        class: String
        type: String
        children: [NavigationChildItem]
    }

    input NavigationConfigInput {
        label: String
        icon: String
        url: String
        id: String
        badge: String
        class: String
        type: String
        children: [NavigationChildItemInput]
    }

    type NavigationChildItem {
        url: String
        label: String
        class: String
        icon: String
    }

    input NavigationChildItemInput {
        url: String
        label: String
        class: String
        icon: String
    }

    extend type Mutation {
        loadConfig(config: NavigationConfigInput): StoreUi
    }
`;
