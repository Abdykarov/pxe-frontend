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
    public isVideo = false;

    @Input()
    public showClose = true;

    @Input()
    public title?: string;

    @Input()
    public size?: IModalSize;

    @Input()
    public isConfirm = false;

    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.size = R.contains(this.size, Object.values(IModalSize)) ? this.size : null;
    }
}
