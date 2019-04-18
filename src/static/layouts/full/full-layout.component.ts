import { Component } from '@angular/core';

import {
    ISettings,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {
    public settings: ISettings = {
        isPublic: true,
        isSimpleFooter: true,
        signInType: SignType.STATIC,
        showLogin: false,
    };
}
