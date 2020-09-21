import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output, ViewChild,
} from '@angular/core';

@Component({
    selector: 'pxe-lp-video-modal',
    styleUrls: ['./lp-video-modal.component.scss'],
    templateUrl: './lp-video-modal.component.html',
})
export class LpVideoModalComponent {
    @ViewChild('video')
    public video: ElementRef;

    @Input()
    public modalOpen: boolean;

    @Input()
    public instanceData: any;

    @Output()
    public closeModal: EventEmitter<any> = new EventEmitter<any>();
}
