import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class DeleteAccountOkSimpleComponent {
    submitVerification = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    };

    redirectToUserProfile = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    };
}
