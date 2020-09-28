import { APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import {
    ApolloLink,
    from,
    NextLink,
    Observable,
    Operation,
} from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { clientSchema } from 'src/common/graphql/middleware/client-schema';
import { CmsService } from 'src/app/services/cms.service';
import {
    CONSTS,
    OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION,
    OPERATIONS_WITHOUT_SCROLL_ON_ERRORS,
    OPERATIONS_WITHOUT_TOKEN,
} from 'src/app/app.constants';
import { environment } from 'src/environments/environment';

const setTokenHeader = (operation: Operation, cmsService: CmsService): void => {
    const Authorization = cmsService.getAuthorizationHeaders();
    operation.setContext({
        headers: {
            ...(!!Authorization) && {Authorization},
        },
    });
};

const apolloCmsGraphQLFactory = (cmsService: CmsService) => {
    const cache = new InMemoryCache();

    const http = createHttpLink({
        uri: `https://squidex.lnd.bz/api/content/pxe-parc4u/graphql/`,
    });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        setTokenHeader(operation, cmsService);

        return new Observable(observer => {
            let subscription;
            try {
                subscription = forward(operation).subscribe({
                    next: (result: any) => {
                        observer.next(result);
                    },
                    complete: observer.complete.bind(observer),
                    error: networkError => {
                        // if (networkError.status === 401 || networkError.statusCode === 401) {
                        //     authService.refreshToken()
                        //         .subscribe(
                        //             () => {
                        //                 setTokenHeader(operation);
                        //                 innerSubscription = forward(operation).subscribe(observer);
                        //             },
                        //             () => {});
                        // } else {
                            observer.error(networkError);
                        // }
                    },
                });
            } catch (e) {
                observer.error(e);
            }
            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            };
        });
    });

    const link = from([auth, http]);

    return {
        [CONSTS.APOLLO_CMS_KEY]: {
            cache,
            link,
            typeDefs: clientSchema,
            connectToDevTools: !environment.production,
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'cache-first',
                },
            },
        },
    };
};

export const ApolloCMSGraphQLProvider = {
    provide: APOLLO_NAMED_OPTIONS,
    useFactory: apolloCmsGraphQLFactory,
    deps: [
        CmsService,
    ],
};
