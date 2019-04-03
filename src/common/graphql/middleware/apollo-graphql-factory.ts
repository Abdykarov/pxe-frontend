import { Router } from '@angular/router';

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
import { withClientState } from 'apollo-link-state';

import { AuthService } from 'src/app/services/auth.service';
import {
    defaults,
    resolvers,
} from '../resolvers';
import { environment } from 'src/environments/environment';

export function apolloGraphqlFactory(httpLink: HttpLink, authService: AuthService, router: Router) {
    const cache = new InMemoryCache();

    const http = httpLink.create({
        uri: `${environment.graphql}/graphql`,
    });

    const local = withClientState({
        cache,
        defaults,
        resolvers,
    });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            },
        });

        // return forward(operation);

        const refreshToken = () => new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('foo');
            }, 300);
        });

        return new Observable(observer => {
            let subscription, innerSubscription;
            try {
                subscription = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    complete: observer.complete.bind(observer),
                    error: networkError => {
                        if (networkError.status === 400) {
                            refreshToken().then(success => {
                                if (success) {
                                    operation.setContext({
                                        headers: {
                                            Authorization: `Bearer ${authService.getToken()}`,
                                        },
                                    });
                                    innerSubscription = forward(operation).subscribe(observer);
                                } else {
                                    observer.error(new Error('jwt refresh failed'));
                                }
                            });
                        } else {
                            console.log('%c ***** networkError *****', 'background: #bada55; color: #000; font-weight: bold', networkError);
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

    const error = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
                console.log('%c ***** [GraphQL error] *****', 'background: red; color: #fff; font-weight: bold',
                    `Message: ${message}, Location: ${locations}, Path: ${path}`),
            );
        }

        if (networkError) {
            console.log('%c ***** [Network error] *****', 'background: red; color: #fff; font-weight: bold', networkError);
        }
    });

    const token = authService.getToken();
    console.log('%c ***** auth *****', 'background: #bada55; color: #000; font-weight: bold', token);

    return {
        cache,
        link: from([error, local, auth, http]),
        connectToDevTools: !environment.production,
    };
}
