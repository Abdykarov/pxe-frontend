import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as R from 'ramda';

@Component({
    selector: 'pxe-show-confirm-modal',
    styleUrls: ['./confirm-modal.component.scss'],
    templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent implements OnInit {
    @Input()
    public modalOpen: boolean;

    @Input()
    public instanceData: any;

    @Output()
    public closeModal: EventEmitter<any> = new EventEmitter<any>();

    public showClose = true;
    public showCloseButton = true;
    public showConfirm = true;
    public titleClose = 'Zpět';
    public titleConfirm = 'Pokračovat';
    public size = '';

    ngOnInit() {
        this.showClose =
            this.instanceData && !R.isNil(this.instanceData.showClose)
                ? this.instanceData.showClose
                : this.showClose;
        this.showCloseButton =
            this.instanceData && !R.isNil(this.instanceData.showCloseButton)
                ? this.instanceData.showCloseButton
                : this.showCloseButton;
        this.showConfirm =
            this.instanceData && !R.isNil(this.instanceData.confirmDelete)
                ? this.instanceData.confirmDelete
                : this.showConfirm;
        this.titleClose =
            this.instanceData && !R.isNil(this.instanceData.titleClose)
                ? this.instanceData.titleClose
                : this.titleClose;
        this.titleConfirm =
            this.instanceData && !R.isNil(this.instanceData.titleConfirm)
                ? this.instanceData.titleConfirm
                : this.titleConfirm;
        this.size =
            this.instanceData && !R.isNil(this.instanceData.size)
                ? this.instanceData.size
                : this.size;
    }
}
