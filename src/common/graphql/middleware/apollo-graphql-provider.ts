import { Router } from '@angular/router';

import { APOLLO_OPTIONS } from 'apollo-angular';
import {
    ApolloLink,
    from,
    NextLink,
    Observable,
    Operation,
} from 'apollo-link';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import {
    defaults,
    resolvers,
} from '../resolvers/';
import { environment } from 'src/environments/environment';

const apolloGraphQLFactory = (httpLink: HttpLink, authService: AuthService, router: Router) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (operation: Operation): void => {
        const token = authService.getToken();
        if (token) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    };

    const http = httpLink.create({
        uri: `${environment.url}/graphql/`,
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
                        if (networkError.status === 401) {
                            authService.refreshToken()
                                .subscribe(
                                    () => {
                                        setTokenHeader(operation);
                                        innerSubscription = forward(operation).subscribe(observer);
                                    },
                                    () => {
                                        observer.error(new Error('jwt refresh failed'));
                                        router.navigate([CONSTS.PATHS.LOGOUT]);
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
        // response.errors = null;
    });

    // TODO restLink, retryLink?

    cache.writeData({
        data: defaults,
    });

    return {
        cache,
        resolvers,
        link: from([error, auth, http]),
        connectToDevTools: !environment.production,
    };
};

export const ApolloGraphQLProvider = {
    provide: APOLLO_OPTIONS,
    useFactory: apolloGraphQLFactory,
    deps: [
        HttpLink,
        AuthService,
        Router,
    ],
};
