import { Injectable } from '@angular/core';

import {
    Observable,
    of,
} from 'rxjs';

import { AbstractFacade } from 'src/common/abstract.facade';
import { UserService } from 'src/common/graphql/services/user.service';

@Injectable({
    providedIn: 'root',
})
export class UnsubscribeNewsFacade extends AbstractFacade {

    constructor(
         private userService: UserService,
    ) {
        super();
    }

    isLoading$: Observable<boolean> = this.createIsLoading(of({}));

    public unsubscribe = (userProfileId: string): void => {
        this.isUploadingSubject$.next(true);
        this.userService.unsubscribeNotification(userProfileId)
            .subscribe(
                () => this.successResultSubject$.next(true),
                error => {
                    this.processError(error);
                    this.isUploadingSubject$.next(false);
                },
                () => this.isUploadingSubject$.next(false),
            );

    }
}
