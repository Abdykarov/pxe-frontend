import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import {
    Component,
    OnDestroy,
    Renderer2,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IUserTypes } from 'src/app/services/model/auth.model';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent extends AbstractComponent implements OnDestroy {
    public settings: ISettings = {
        isPublic: true,
        isLandingPage: false,
        isSimpleFooter: true,
        userType: IUserTypes.CONSUMER,
        isStatic: true,
        signUpType: SignType.STATIC,
        hideLeftNavigation: false,
        loginType: LoginType.NONE,
    };

    constructor(
        protected route: ActivatedRoute,
        private renderer: Renderer2,
        protected router: Router,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.settings = <ISettings>this.route.snapshot.firstChild.data;
                    this.removeBodyClasses();
                    this.renderer.addClass(document.body, this.settings.isPublic ? 'public' : 'secured');
                }
            });
    }

    public homeRedirect = () => {
        this.router.navigate([CONSTS.PATHS.EMPTY]);
    }

    private removeBodyClasses = () => {
        this.renderer.removeClass(document.body, 'public');
        this.renderer.removeClass(document.body, 'secured');
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.removeBodyClasses();
    }
}
