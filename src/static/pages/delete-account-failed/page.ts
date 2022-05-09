import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class DeleteAccountFailedComponent {
    redirectToUserProfile = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    };

    redirectToConcludedContract = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    };
}
