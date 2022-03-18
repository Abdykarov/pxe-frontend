import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import * as R from 'ramda';
// own models
import { IAddType } from './models/type.model';

@Component({
    selector: 'lnd-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AddComponent {
    @Output()
    public action: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    public customClass?: string;

    @Input()
    public label: string;

    @Input()
    public type?: IAddType;

    constructor() {
        this.type = R.contains(this.type, Object.values(IAddType))
            ? this.type
            : IAddType.DEFAULT;
    }
}
