import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { getErrorMessage } from 'src/common/utils';
import { IOption } from '../models/option.model';
import { IValidationMessages } from '../models/validation-messages.model';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
    selector: 'lnd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
    @Output()
    public appendButtonAction?: EventEmitter<any> = new EventEmitter();

    @Input()
    public addTag = false;

    @Input()
    public appendButtonIcon?: string;

    @Input()
    public bindValue = 'key';

    @Input()
    public disabledField = false;

    @Input()
    public error?: any;

    @Input()
    public label?: string;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public selectName: string;

    @Input()
    public options?: Array<IOption>;

    @Input()
    public placeholder?: string;

    @Input()
    public searchable = false;

    @Input()
    public subtext?: string;

    @Input()
    public success = false;

    @Input()
    public touched = false;

    @Input()
    public validationMessages?: IValidationMessages;

    @Input()
    typeahead?: EventEmitter<any>;

    @Input()
    public warning?: any;

    public customSearchFn = (term: string, item: any) => {
        if (!!term && term.length > 2) {
            return item.label.toLocaleLowerCase().indexOf(term) > -1 || item.label.indexOf(term) > -1;
        }
    }

    public getErrorMessage = () => getErrorMessage(this.error, this.validationMessages);

    constructor(private config: NgSelectConfig) {
        this.config.notFoundText = 'Nenalezeno';
        this.config.typeToSearchText = 'Napište výraz';
        this.config.addTagText = 'Přidat položku';
        this.config.loadingText = 'Načítání...';
        this.config.clearAllText = 'Vymazat';
    }
}
