import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { ROOT } from 'src/app/routes/paths';

@Component({
    templateUrl: './logout-page.component.html',
})
export class LogoutPageComponent extends AbstractComponent implements OnInit {
    public error = false;

    public counter = 0;
    public visible = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();
    }

    ngOnInit() {
        this.logout();
    }

    public logout = () => {
        this.authService.logout()
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([ROOT]);
                },
                error => {
                    this.error = true;
                    this.cd.markForCheck();
                });
    }

    public reload = ($event) => {
        $event.preventDefault();
        this.error = false;
        this.logout();
    }
}
