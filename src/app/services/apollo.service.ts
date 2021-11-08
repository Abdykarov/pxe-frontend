import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
    providedIn: 'root',
})
export class ApolloService {
    constructor(private apollo: Apollo) {}

    public resetStore = (): Promise<any> =>
        this.apollo
            .getClient()
            .resetStore()
            .then(() => {
                // this.apollo.getClient().cache.writeData({
                //     data: defaults,
                // });
            });
}
