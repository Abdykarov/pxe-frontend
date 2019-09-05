import { Router } from '@angular/router';

import { APOLLO_OPTIONS } from 'apollo-angular';
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
import { CONSTS } from 'src/app/app.constants';
import {
    defaults,
    resolvers,
} from '../resolvers/';
import { environment } from 'src/environments/environment';
import { scrollToElementFnc } from 'src/common/utils';
import { clientSchema } from 'src/common/graphql/middleware/client-schema';

const apolloGraphQLFactory = (authService: AuthService, router: Router) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (operation: Operation): void => {
        const token = authService.getToken();
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'X-API-Key': `${environment.x_api_key}`,
            },
        });
    };

    const http = new BatchHttpLink({
        uri: `${environment.url_graphql}/`,
        fetch: fetch,
    });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        setTokenHeader(operation);

        return new Observable(observer => {
            let subscription, innerSubscription;
            try {
                subscription = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    complete: observer.complete.bind(observer),
                    error: networkError => {
                        if (networkError.status === 401 || networkError.statusCode === 401) {
                            authService.refreshToken()
                                .subscribe(
                                    () => {
                                        setTokenHeader(operation);
                                        innerSubscription = forward(operation).subscribe(observer);
                                    },
                                    () => {
                                        // observer.error(new Error('jwt refresh failed'));
                                        this.authService.logoutForced();
                                    });
                        } else {
                            observer.error(networkError);
                        }
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

    const error = onError(({ graphQLErrors, networkError, response }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => {
                // console.log('%c ***** [GraphQL error] *****', 'background: red; color: #fff; font-weight: bold',
                //     `Message: ${message}, Location: ${locations}, Path: ${path}`);
            });
        }

        if (networkError) {
            // console.log('%c ***** [Network error] *****', 'background: red; color: #fff; font-weight: bold', networkError);
        }

        if (graphQLErrors || networkError) {
            // TODO scroll to error (global or field)
            scrollToElementFnc('top');
        }
        // response.errors = null;
    });

    cache.writeData({
        data: defaults,
    });

    const link = from([error, auth, http]);
    const client = {
        cache,
        resolvers,
        link,
        typeDefs: clientSchema,
        connectToDevTools: !environment.production,
    };

    return client;
};

export const ApolloGraphQLProvider = {
    provide: APOLLO_OPTIONS,
    useFactory: apolloGraphQLFactory,
    deps: [
        AuthService,
        Router,
    ],
};
