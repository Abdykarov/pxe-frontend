import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
    styleUrls: ['../../../assets/scss/05_pages/error-page.scss'],
})
export class Error404PageComponent {
    public clicked = (evt) => {
        evt.preventDefault();
    };
}
