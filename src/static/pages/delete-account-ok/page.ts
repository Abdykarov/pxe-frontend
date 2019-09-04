import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class DeleteAccountOkComponent {
    public phone = '+420724789456';

    redirectToUserProfile = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }

    sendConfirmationSms = () => {
        console.log('CLICKED');
    }
}
