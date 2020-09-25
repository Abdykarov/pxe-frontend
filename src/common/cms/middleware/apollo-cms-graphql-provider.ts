import { HttpHeaders } from '@angular/common/http';

import * as R from 'ramda';
import { APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import {
    ApolloLink,
    from,
    NextLink,
    Observable,
    Operation,
} from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import fetch from 'unfetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { AuthService } from 'src/app/services/auth.service';
import { clientSchema } from 'src/common/graphql/middleware/client-schema';
import {
    CONSTS,
    OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION,
    OPERATIONS_WITHOUT_SCROLL_ON_ERRORS,
    OPERATIONS_WITHOUT_TOKEN,
} from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { processErrorScrolls } from 'src/common/utils';
import { CmsService } from 'src/app/services/cms.service';

const apolloCmsGraphQLFactory = (cmsService: CmsService) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (operation: Operation): void => {
        console.log('AHOJ');
        // const headers: HttpHeaders = authService.getAuthorizationHeaders(null);
        // const xAPIKey = headers.get('X-API-Key');
        // const Authorization = headers.get('Authorization');
        // operation.setContext({
        //     headers: {
        //         ...(!!Authorization && !withoutToken) && {Authorization},
        //         'X-API-Key': xAPIKey,
        //     },
        // });
    };

    const http = new BatchHttpLink({
        uri: `https://squidex.lnd.bz/`,
        fetch: fetch,
    });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        setTokenHeader(operation);

        return new Observable(observer => {
            let subscription, innerSubscription;
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
                if (innerSubscription) {
                    innerSubscription.unsubscribe();
                }
            };
        });
    });

    const link = from([auth, http]);

    return {
        cms: {
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
