import {
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';

import { IOption } from '../models/option.model';

@Component({
    selector: 'lnd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
    @Input()
    public disabledField = false;

    @Input()
    public error?: any;

    @Input()
    public label?: string;

    @Input()
    public parentForm;

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
    public warning?: any;

    public customSearchFn = (term: string, item: any) => {
        if (!!term && term.length > 2) {
            return item.label.toLocaleLowerCase().indexOf(term) > -1 || item.label.indexOf(term) > -1;
        }
    }
}
