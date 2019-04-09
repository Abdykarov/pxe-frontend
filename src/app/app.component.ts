import {
    Component,
    ChangeDetectionStrategy,
} from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'lnd-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor() {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gtmId;
        document.head.prepend(script);
    }
}
