import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as navigation from '../queries/navigation';
import { toggleOverlay } from 'src/common/graphql/mutation/navigation';

@Injectable({
    providedIn: 'root',
})
export class OverlayService {

    constructor(private apollo: Apollo) { }

    public toggleOverlay() {
        return  this.apollo
                .mutate({
                    mutation: toggleOverlay,
                });
    }

    public getOverlay() {
       return   this.apollo
                .watchQuery<any>({
                    query: navigation.showOverlay,
                })
                .valueChanges;
    }

}
