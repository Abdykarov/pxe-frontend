import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
    ApolloLink,
    from,
    InMemoryCache,
    NextLink,
    Observable,
    Operation,
} from '@apollo/client/core';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { APOLLO_OPTIONS } from 'apollo-angular';
import * as R from 'ramda';
import {
    CONSTS,
    OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION,
    OPERATIONS_WITHOUT_SCROLL_ON_ERRORS,
    OPERATIONS_WITHOUT_TOKEN,
} from 'src/app/app.constants';
import { clientSchema } from 'src/common/graphql/middleware/client-schema';
import { AuthService } from 'src/common/services/auth.service';
import { processErrorScrolls } from 'src/common/utils';
import { environment } from 'src/environments/environment';
import fetch from 'unfetch';
import { resolvers } from '../resolvers/';

const apolloGraphQLFactory = (authService: AuthService, router: Router) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (
        operation: Operation,
        withoutToken = false
    ): void => {
        const headers: HttpHeaders = authService.getAuthorizationHeaders(null);
        const xAPIKey = headers.get('X-API-Key');
        const Authorization = headers.get('Authorization');
        operation.setContext({
            headers: {
                ...(!!Authorization && !withoutToken && { Authorization }),
                'X-API-Key': xAPIKey,
            },
        });
    };

    const http = new BatchHttpLink({
        uri: `${environment.url_graphql}/`,
        fetch: <any>fetch,
        batchMax: CONSTS.MAX_REQUEST_IN_BATCH_LINK,
    });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        const withoutToken = R.includes(
            operation.operationName,
            OPERATIONS_WITHOUT_TOKEN
        );
        setTokenHeader(operation, withoutToken);

        return new Observable((observer) => {
            let subscription, innerSubscription;
            try {
                subscription = forward(operation).subscribe({
                    next: (result: any) => {
                        if (result.errors) {
                            const isAccessDeniedException = R.pipe(
                                R.filter(
                                    (err) =>
                                        err &&
                                        err.type === 'AccessDeniedException'
                                ),
                                R.head
                            )(result.errors);
                            const ignoreException = !R.includes(
                                operation.operationName,
                                OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION
                            );
                            if (isAccessDeniedException && ignoreException) {
                                authService.logoutForced();
                            }
                        }
                        observer.next(result);
                    },
                    complete: observer.complete.bind(observer),
                    error: (networkError) => {
                        if (
                            networkError.status === 401 ||
                            networkError.statusCode === 401
                        ) {
                            authService.refreshToken().subscribe(
                                () => {
                                    setTokenHeader(operation);
                                    innerSubscription =
                                        forward(operation).subscribe(observer);
                                },
                                () => {
                                    // observer.error(new Error('jwt refresh failed'));
                                    authService.logoutForced();
                                }
                            );
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
            const isOperationWithoutScrollOnError = !R.includes(
                operation.operationName,
                OPERATIONS_WITHOUT_SCROLL_ON_ERRORS
            );
            if (isOperationWithoutScrollOnError) {
                processErrorScrolls();
            }
        }
        // response.errors = null;
    });

    // cache.write({
    //     data: defaults,
    // });

    const link = from([error, auth, http]);
    return {
        cache,
        resolvers,
        link,
        typeDefs: clientSchema,
        connectToDevTools: !environment.production,
    };
};

export const ApolloGraphQLProvider = {
    provide: APOLLO_OPTIONS,
    useFactory: apolloGraphQLFactory,
    deps: [AuthService, Router],
};
