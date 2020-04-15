import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from, NextLink, Observable, Operation } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { onError } from 'apollo-link-error';

import * as R from 'ramda';
import { CONSTS } from 'src/app/app.constants';

import { AuthService } from 'src/app/services/auth.service';
import { clientSchema } from 'src/common/graphql/middleware/client-schema';
import { scrollToElementFnc } from 'src/common/utils';
import { environment } from 'src/environments/environment';
import fetch from 'unfetch';
import { defaults, resolvers } from '../resolvers/';

const apolloGraphQLFactory = (authService: AuthService, router: Router) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (operation: Operation): void => {
        const headers: HttpHeaders = authService.getAuthorizationHeaders(null);
        const xAPIKey = headers.get('X-API-Key');
        const Authorization = headers.get('Authorization');
        operation.setContext({
            headers: {
                ...(!!Authorization) && {Authorization},
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
        setTokenHeader(operation);

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

                            if (isAccessDeniedException) {
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
            setTimeout(() => {
                const globalErrorDanger = document.getElementsByClassName('alert-danger')[0];
                if (globalErrorDanger) {
                    globalErrorDanger.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }

                const invalidInput = document.getElementsByClassName('invalid-input')[0];
                if (!globalErrorDanger && invalidInput) {
                    invalidInput.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
            // TODO scroll to error (global or field)
            // if (!OPERATIONS_WITHOUT_SCROLL_ON_ERRORS.includes(operation.operationName)) {
            //     scrollToElementFnc('top');
            // }
        }
        // response.errors = null;
    });

    cache.writeData({
        data: defaults,
    });

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
    deps: [
        AuthService,
        Router,
    ],
};
