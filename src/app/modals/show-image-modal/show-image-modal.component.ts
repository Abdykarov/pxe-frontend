import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'nn-modules-validation-modal',
    styleUrls: ['./show-image-modal.component.scss'],
    templateUrl: './show-image-modal.component.html',
})
export class ShowImageModalComponent implements OnInit {
    @Input()
    public modalOpen: boolean;

    @Input()
    public instanceData: any;

    @Output()
    public closeModal: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    ngOnInit() {}
}
