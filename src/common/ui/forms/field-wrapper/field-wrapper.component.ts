import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';

import { DynamicPipe } from 'src/common/pipes/dynamic/dynamic.pipe';
import { IValidationMessages } from 'src/common/ui/forms/models/validation-messages.model';
import { getErrorMessage } from 'src/common/utils';

@Component({
    selector: 'pxe-field-wrapper',
    templateUrl: './field-wrapper.component.html',
    styleUrls: ['./field-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FieldWrapperComponent implements OnChanges {
    @Input()
    public error?: any;

    @Input()
    public label = '';

    @Input()
    public labelFor = '';

    @Input()
    public labelTemplate?: TemplateRef<any>;

    @Input()
    public subtext?: string;

    @Input()
    public subtextTemplate?: TemplateRef<any>;

    @Input()
    public validationMessages?: IValidationMessages;

    public errorMessage = null;

    constructor(
        private cd: ChangeDetectorRef,
        private dynamicPipe: DynamicPipe,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        this.errorMessage = null;
        if (changes && changes.error && changes.error.currentValue) {
            this.errorMessage = getErrorMessage(changes.error.currentValue, this.validationMessages, this.dynamicPipe);
            this.cd.markForCheck();
        }
    }
}
