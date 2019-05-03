import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
} from '@angular/forms';

import {
    debounceTime,
    mergeMap,
} from 'rxjs/operators';

import { IOption } from 'src/common/ui/forms/models/option.model';
import { MapyCzApiService } from './services/mapy-cz-api.service';

@Component({
    selector: 'pxe-address-whisperer',
    templateUrl: './address-whisperer.component.html',
    styleUrls: ['./address-whisperer.component.scss'],
})
export class AddressWhispererComponent {
    private static readonly ROWS_RESPONSE = 5;

    public addresses: Array<IOption> = [];

    public parentForm: FormGroup = new FormGroup({
        selected: new FormControl(),
    });

    public typeahead: EventEmitter<any>;

    constructor(
        private cd: ChangeDetectorRef,
        private mapyCzService: MapyCzApiService,
    ) {
        this.typeahead = new EventEmitter();

        this.typeahead
            .pipe(
                debounceTime(200),
                mergeMap((term: string) => this.mapyCzService.getPlaces(AddressWhispererComponent.ROWS_RESPONSE, term)),
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
