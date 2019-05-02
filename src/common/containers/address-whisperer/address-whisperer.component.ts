import {
    Component,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
} from '@angular/forms';

import { IOption } from 'src/common/ui/forms/models/option.model';
import { MapyCzApiService } from './services/mapy-cz-api.service';

@Component({
    selector: 'pxe-address-whisperer',
    templateUrl: './address-whisperer.component.html',
    styleUrls: ['./address-whisperer.component.scss'],
})
export class AddressWhispererComponent {

    public seznamApi$ = this.mapyCzService.getPlaces(5, 'lánecká 426');

    public parentForm = new FormGroup({
        firstName: new FormControl(''),
    });


    public options: Array<IOption> = [];

    public selectName = 'firstName';

    constructor(
        private mapyCzService: MapyCzApiService,
        private builder: FormBuilder,
    ) {}
}
