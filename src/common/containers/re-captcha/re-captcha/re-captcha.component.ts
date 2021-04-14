import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IResolveAction } from '../models/models';
import { ReCaptchaService } from 'src/common/containers/re-captcha/re-captcha.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'pxe-re-captcha',
    templateUrl: './re-captcha.component.html',
})
export class ReCaptchaComponent extends AbstractComponent {

    @Input()
    public id: string;

    @Output()
    public resolveAction: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private reCaptchaService: ReCaptchaService,
    ) {
        super();

        this.reCaptchaService.resolveAction$
            .pipe(
                takeUntil(this.destroy$),
                filter((resolveAction: IResolveAction) =>
                    resolveAction && resolveAction.id === this.id,
                ),
            )
            .subscribe((resolveAction: IResolveAction) => {
                this.resolveAction.emit(resolveAction.data);
            });

    }

    public execute(data: any) {
        const resolveAction: IResolveAction = {
            data: data,
            id: this.id,
        };
        this.reCaptchaService.execute(resolveAction);
    }
}

