import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})

export class RegistrationPageComponent {

    public action(evt) {
        evt.preventDefault();
        window.open('/full/landing-page', '_blank');
    }
}
