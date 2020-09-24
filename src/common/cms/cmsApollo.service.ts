import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { InMemoryCache } from 'apollo-cache-inmemory';

@Injectable({
    providedIn: 'root',
})
export class CmsService {
    constructor(
        public apollo: Apollo,
    ) {
    }
}
