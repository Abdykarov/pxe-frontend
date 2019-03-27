import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {

    constructor(
        private router: Router,
    ) {
        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    console.log('NAVIGATION END');
                }
            });
    }
}
