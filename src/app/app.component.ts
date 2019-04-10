import {
    Component,
    ChangeDetectionStrategy,
} from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { GTMService } from './services/gtm.service';

@Component({
    selector: 'lnd-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

    constructor(
        private gtmService: GTMService,
        private router: Router,
    ) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gtmId;
        document.head.prepend(script);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtmService.gtm(event);
            }
        });
    }

}
