import { Component } from '@angular/core';

@Component({
  templateUrl: './page.html',
})

export class DashboardComponent {

    newSupplyPointAction = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
