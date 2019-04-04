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
import { withClientState } from 'apollo-link-state';

import { AuthService } from 'src/app/services/auth.service';
import {
    defaults,
    resolvers,
} from '../resolvers';
import { environment } from 'src/environments/environment';

const apolloGraphQLFactory = (httpLink: HttpLink, authService: AuthService, router: Router) => {
    const cache = new InMemoryCache();

    const setTokenHeader = (operation: Operation): void => {
        const token = authService.getToken();
        if (token) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Authorization: `Bearer eyJhbGciOiJSUzUxMiJ9.eyJ1c2VybmFtZSI6IjVfaG9zcGFza2FAUEFSQy5QWEUuQ1oiLCJmaXJzdG5hbWUiOiJNYXJ0aW4iLCJzdXJuYW1lIjoiSG9zcGFza2EiLCJyb2xlIjoicGFyY19tYW5hZ2VyIiwic3ViamVjdE5hbWUiOiJKYW4iLCJzdWJqZWN0SWQiOjUsInNpZCI6IkZPcEI3UFR1d2VQOU1CWWJUcUJKZVJLVGNrVkZJVWM4THl6R2V6azlvVHFzYmZGTm9xYTZtUXNMQU4wNTJ0eWMiLCJkYXRhIjpudWxsLCJzbXNDb25maXJtZWQiOmZhbHNlLCJsYXN0U21zQ29uZmlybVRzIjowLCJleHAiOjE1NTQ0MjY2NjQ3NzMsInRva2VuIjpudWxsLCJtYW5hZ2VVc2VycyI6ZmFsc2UsIm1hbmFnZU9yZGVycyI6ZmFsc2UsIm1hbmFnZU9mZmVycyI6ZmFsc2V9.jZUot0woEVz2An3WTJotQP7Mq-8RpIj7095p25nqe4_6TMUExDi5bfSknF4LvDdHAr7XBNVyoMGZyhFeSXiAoCs45WIUI1qnibV-78pg6yI8riPG9qeEqTXfvJ51DzXP_mgJzDdb_TDHHOG_usCBHZSZSrCIhsjkKqGuNK-y8M1CKzoO_I2R4mQMDWGh7AZllleM8mDC_K2BV_5hoXy6KBU80QCX7erI38YB6Jv27qSf0Srs3C0k0fmAVZgtIBGihXpoNXFPhQzEu1TR5ckNh1pKZsdcaIuFPrr71_6iI5g6XBs4aGLXvw2OlNiF00R7W40behJoLW3Y_jAETqKCXw`,
                },
            });
        }
    };

    const http = httpLink.create({
        uri: `${environment.url}/graphql`,
        // uri: `http://localhost:4203/graphql`,
    });

    const local = withClientState({
        cache,
        defaults,
        resolvers,
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
                                        router.navigate(['/logout']);
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

    // TODO restLink, retryLink?

    return {
        cache,
        link: from([error, local, auth, http]),
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
