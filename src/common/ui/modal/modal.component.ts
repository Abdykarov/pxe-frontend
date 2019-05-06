import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';

import * as R from 'ramda';

import { IModalSize } from './models/size.model';

@Component({
    selector: 'lnd-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
    @Input()
    public isModalOpen: boolean;

    @Input()
    public title?: string;

    @Input()
    public size?: IModalSize;

    @Output()
    public close: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
        this.size = R.contains(this.size, Object.values(IModalSize)) ? this.size : null;
    }
}
