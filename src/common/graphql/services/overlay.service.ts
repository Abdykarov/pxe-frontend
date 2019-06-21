import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { showOverlayQuery } from 'src/common/graphql/queries/overlay';
import { toggleOverlayMutation } from 'src/common/graphql/mutation/overlay';

@Injectable({
    providedIn: 'root',
})
export class OverlayService {

    constructor(private apollo: Apollo) { }

    public toggleOverlay(value = null) {
        return this.apollo
            .mutate({
                mutation: toggleOverlayMutation,
                variables: {
                    value: value,
                },
            });
    }

    public getOverlay() {
        return this.apollo
            .watchQuery<any>({
                query: showOverlayQuery,
            })
            .valueChanges;
    }
}
