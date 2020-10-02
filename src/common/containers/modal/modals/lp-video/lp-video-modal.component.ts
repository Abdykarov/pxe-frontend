import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import { playVideo } from 'src/common/utils';

@Component({
    selector: 'pxe-lp-video-modal',
    styleUrls: ['./lp-video-modal.component.scss'],
    templateUrl: './lp-video-modal.component.html',
})
export class LpVideoModalComponent implements OnInit {

    @ViewChild('video', { static: true })
    public video: ElementRef;

    @Input()
    public modalOpen: boolean;

    @Input()
    public instanceData: any;

    @Output()
    public closeModal: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        playVideo(this.video.nativeElement);
    }
}
