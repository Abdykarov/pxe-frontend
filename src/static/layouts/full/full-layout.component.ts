import { Component } from '@angular/core';

import { IRouterData } from 'src/app/layouts/model/router-data';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {
    public routerData: IRouterData = {
        isPublic: true,
        isSimpleFooter: true,
        showSignIn: true,
        showLogin: false,
    };
}
