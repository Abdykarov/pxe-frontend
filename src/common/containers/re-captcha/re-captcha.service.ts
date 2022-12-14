import { Injectable } from '@angular/core';
import { RecaptchaComponent } from 'ng-recaptcha';
import * as R from 'ramda';
import { BehaviorSubject } from 'rxjs';
import { IResolveAction } from './models/models';

@Injectable({
    providedIn: 'root',
})
export class ReCaptchaService {
    public readonly resolveActionSubject$: BehaviorSubject<IResolveAction> =
        new BehaviorSubject(null);
    public readonly resolveAction$ = this.resolveActionSubject$.asObservable();

    public executionResolveAction: IResolveAction = null;
    private reCaptcha: RecaptchaComponent = null;

    public setReCaptcha = (captchaRef: RecaptchaComponent) =>
        (this.reCaptcha = captchaRef);
    public getReCaptcha = (): RecaptchaComponent => this.reCaptcha;

    public execute = (resolveAction: IResolveAction) => {
        this.executionResolveAction = resolveAction;
        this.getReCaptcha().execute();
    };

    public resolve = (code: string) => {
        this.resolveActionSubject$.next(this.executionResolveAction);
        if (!R.isNil(this.executionResolveAction)) {
            this.reset();
        }
    };

    public reset = () => {
        this.resolveActionSubject$.next(null);
        this.executionResolveAction = null;
        this.getReCaptcha().reset();
    };
}
