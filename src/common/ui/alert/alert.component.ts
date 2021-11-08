import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as R from 'ramda';
import { IAlertIcon } from './models/icon.model';
import { IAlertType } from './models/type.model';

@Component({
    selector: 'lnd-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
    @Input()
    public type: IAlertType;

    @Input()
    public customClass?: string;

    @Input()
    public isDismissible = false;

    @Input()
    public hasIcon = false;

    @Output()
    public close: EventEmitter<string> = new EventEmitter<string>();

    get icon(): string {
        return IAlertIcon[this.type.toUpperCase()] || null;
    }

    constructor() {
        this.type = R.contains(this.type, Object.values(IAlertType))
            ? this.type
            : IAlertType.INFO;
    }
}
