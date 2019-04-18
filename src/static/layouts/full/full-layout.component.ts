import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {
    public isSimpleFooter = false;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isSimpleFooter = this.route.snapshot.firstChild.data.isSimpleFooter;
            }
        });
    }
}
