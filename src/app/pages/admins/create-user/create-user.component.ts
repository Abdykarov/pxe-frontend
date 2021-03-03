import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    getConfigStepper,
    TypeStepper,
} from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

@Component({
    selector: 'pxe-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent extends AbstractComponent {
    public title: string = null;
    public configStepper: IStepperProgressItem[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    const step = this.route.snapshot.firstChild.data['step'];
                    this.title = this.route.snapshot.firstChild.data['title'];
                    this.configStepper = getConfigStepper(step, false, TypeStepper.CREATE_USER);
                }
            });
    }
}
