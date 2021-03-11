import { APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import {
    ApolloLink,
    from,
    NextLink,
    Observable,
    Operation,
} from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { CmsService } from 'src/app/services/cms.service';
import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { HttpLink } from 'apollo-angular-link-http';

const setTokenHeader = (operation: Operation, cmsService: CmsService): void => {
    const Authorization = cmsService.getAuthorizationHeaders();
    operation.setContext({
        headers: {
            ...(!!Authorization) && {Authorization},
        },
    });
};

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-first',
    },
};

const apolloCmsGraphQLFactory = (
    cmsService: CmsService,
    httpLink: HttpLink,
) => {
    const useDirectlyCMS = environment.useDirectlyCMS;
    const uriDomain = useDirectlyCMS ? environment.url_cms_local : environment.url_cms;

    const cache = new InMemoryCache();

    const http = httpLink.create({ uri: `${uriDomain}/${environment.url_cms_api}` });

    const auth = new ApolloLink((operation: Operation, forward: NextLink) => {
        if (useDirectlyCMS) {
            setTokenHeader(operation, cmsService);
        }

        return new Observable(observer => {
            let subscription, innerSubscription;
            try {
                subscription = forward(operation).subscribe({
                    next: result => observer.next(result),
                    complete: observer.complete.bind(observer),
                    error: networkError => {
                        if (networkError.status === 401 || networkError.statusCode === 401) {
                            if (useDirectlyCMS) {
                                setTokenHeader(operation, cmsService);
                            }

                            innerSubscription = forward(operation).subscribe(observer);
                        }
                    },
                });
            } catch (e) {
                observer.error(e);
            }
            return () => {
                if (innerSubscription) {
                    innerSubscription.unsubscribe();
                }
                if (subscription) {
                    subscription.unsubscribe();
                }
            };
        });
    });

    const link = from([auth, http]);

    // add default options
    return {
        [CONSTS.APOLLO_CMS_KEY]: {
            cache,
            link,
            connectToDevTools: !environment.production,
        },
    };
};

export const ApolloCMSGraphQLProvider = {
    provide: APOLLO_NAMED_OPTIONS,
    useFactory: apolloCmsGraphQLFactory,
    deps: [
        CmsService,
        HttpLink,
    ],
};
