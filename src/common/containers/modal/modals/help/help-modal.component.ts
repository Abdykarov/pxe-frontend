import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'pxe-show-message-modal',
    styleUrls: ['./help-modal.component.scss'],
    templateUrl: './help-modal.component.html',
})
export class HelpModalComponent {
    @Input()
    public modalOpen: boolean;

    @Input()
    public instanceData: any;

    @Output()
    public closeModal: EventEmitter<any> = new EventEmitter<any>();
}
