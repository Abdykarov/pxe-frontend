import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { toggleOverlayMutation } from 'src/common/graphql/mutation/overlay';
import { showOverlayQuery } from 'src/common/graphql/queries/overlay';

@Injectable({
    providedIn: 'root',
})
export class OverlayService {
    constructor(private apollo: Apollo) {}

    public toggleOverlay(value = null) {
        return this.apollo.mutate<any>({
            mutation: toggleOverlayMutation,
            variables: {
                value: value,
            },
        });
    }

    public getOverlay = () =>
        this.apollo.watchQuery<any>({
            query: showOverlayQuery,
        }).valueChanges;
}
