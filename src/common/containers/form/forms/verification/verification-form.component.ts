import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { IContract } from 'src/common/graphql/models/contract';
import { formFields } from './verification-form.config';

@Component({
    selector: 'pxe-verification-form',
    templateUrl: './verification-form.component.html',
    styleUrls: ['./verification-form.component.scss'],
})
export class VerificationFormComponent
    extends AbstractFormComponent
    implements OnChanges, OnDestroy
{
    @Input()
    public showForm = false;

    @Input()
    public smsSent: number | boolean = null;

    @Input()
    public contract: IContract;

    @Input()
    public customSubmitButtonClass = 'w-100';

    @Input()
    public infoTemplate: TemplateRef<any>;

    @Input()
    public labelInput = 'Kód z SMS';

    @Input()
    public enableVerificationLabel = 'Podepsat smlouvu';

    @Input()
    public enableVerificationSubText: string = null;

    @Input()
    public enableButtonType = 'primary';

    @Input()
    public submitLabelText = 'Podepsat smlouvu';

    @Input()
    public sendSmsLabel = 'Získat ověřovací SMS kód';

    @Input()
    public textInfoAboutVerificationPassword = '';

    @Input()
    public phone = null;

    @Output()
    public enableVerificationAction = new EventEmitter<any>();

    @Input()
    public toggleEnabledBySelf = true;

    public formFields = formFields;

    constructor(
        protected fb: FormBuilder,
        public sAnalyticsService: SAnalyticsService
    ) {
        super(fb);
        sAnalyticsService.sFormStart();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (
            this.form &&
            changes.smsSent &&
            changes.smsSent.currentValue !== changes.smsSent.previousValue
        ) {
            this.form.reset();
            this.resetFormError(false);
        }
    }

    public submitValidForm = () => {
        this.submitAction.emit(this.form.controls.smsCode.value);
    };

    public submitSms = () => {
        this.resetFormError(false);
        this.customAction.emit();
    };

    public enableVerification = () => (this.showForm = true);
}
