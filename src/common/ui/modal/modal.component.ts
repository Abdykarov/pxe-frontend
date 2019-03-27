import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as R from 'ramda';

// own models
import { IModalSize } from './models/size.model';

@Component({
    selector: 'lnd-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
    @Input()
    public logoAlt?: string;

    @Input()
    public logoTitle?: string;

    @Input()
    public logoSrc?: string;

    @Input() isModalOpen: boolean;

    @Input() title: string;

    @Input() size?: IModalSize;

    @Output()
    public close: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public domSanitizer: DomSanitizer,
    ) {
        this.size = R.contains(this.size, Object.values(IModalSize)) ? this.size : null;
    }
}
