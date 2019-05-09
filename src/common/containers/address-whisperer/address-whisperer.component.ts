import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    TemplateRef,
} from '@angular/core';
import {
    FormGroup,
} from '@angular/forms';

import {
    debounceTime,
    distinctUntilChanged,
    filter,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AddressWhispererService } from './services/address-whisperer.service';
import { IOption } from 'src/common/ui/forms/models/option.model';

@Component({
    selector: 'pxe-address-whisperer',
    templateUrl: './address-whisperer.component.html',
    styleUrls: ['./address-whisperer.component.scss'],
})
export class AddressWhispererComponent extends AbstractComponent {
    private static readonly ADDRESS_MIN_LENGTH = 2;
    private static readonly DEBOUNCE_TIME = 200;
    private static readonly ROWS_RESPONSE = 5;

    @Input()
    public parentForm: FormGroup;

    @Input()
    public whispererName: string;

    @Input()
    public label: string;

    @Input()
    public templateItem?: TemplateRef<any>;

    @Input()
    public templateLabel?: TemplateRef<any>;

    public addresses: Array<IOption> = [];
    public typeahead: EventEmitter<any>;

    constructor(
        private cd: ChangeDetectorRef,
        private addressWhispererService: AddressWhispererService,
    ) {
        super();
        this.typeahead = new EventEmitter();

        this.typeahead
            .pipe(
                takeUntil(this.destroy$),
                debounceTime(AddressWhispererComponent.DEBOUNCE_TIME),
                filter(term => term && term.length >= AddressWhispererComponent.ADDRESS_MIN_LENGTH),
                distinctUntilChanged(),
                switchMap((term: string) => this.addressWhispererService.getPlaces(AddressWhispererComponent.ROWS_RESPONSE, term)),
            )
            .subscribe((addresses: Array<IOption>)  => {
                this.addresses = addresses;
                this.cd.markForCheck();
            }, (err) => {
                this.addresses = [];
                this.cd.markForCheck();
            });
    }
}
