import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import * as R from 'ramda';
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
import { clientSchema } from 'src/common/graphql/middleware/client-schema';
import {
    CONSTS,
    OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION,
    OPERATIONS_WITHOUT_SCROLL_ON_ERRORS,
    OPERATIONS_WITHOUT_TOKEN,
} from 'src/app/app.constants';
import {
    defaults,
    resolvers,
} from '../resolvers/';
import { environment } from 'src/environments/environment';
import { scrollToElementFnc } from 'src/common/utils';

const apolloGraphQLFactory = (authService: AuthService, router: Router) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (operation: Operation, withoutToken = false): void => {
        const headers: HttpHeaders = authService.getAuthorizationHeaders(null);
        const xAPIKey = headers.get('X-API-Key');
        const Authorization = headers.get('Authorization');
        operation.setContext({
            headers: {
                ...(!!Authorization && !withoutToken) && {Authorization},
                'X-API-Key': xAPIKey,
            },
        });
    };

    const http = new BatchHttpLink({
        uri: `${environment.url_graphql}/`,
        fetch: fetch,
        batchMax: CONSTS.MAX_REQUEST_IN_BATCH_LINK,
    });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        setTokenHeader(operation, OPERATIONS_WITHOUT_TOKEN.includes(operation.operationName));

        return new Observable(observer => {
            let subscription, innerSubscription;
            try {
                subscription = forward(operation).subscribe({
                    next: result => {
                        if (result.errors) {
                            const isAccessDeniedException = R.pipe(
                                R.filter((err) => err && err.type === 'AccessDeniedException'),
                                R.head,
                            )(result.errors);
                            if (isAccessDeniedException && !OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION.includes(operation.operationName)) {
                                authService.logoutForced();
                            }
                        }
                        observer.next(result);
                    },
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
                                        authService.logoutForced();
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

    const error = onError(({ graphQLErrors, networkError, operation }) => {
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
            if (!OPERATIONS_WITHOUT_SCROLL_ON_ERRORS.includes(operation.operationName)) {
                scrollToElementFnc('top');
            }
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
