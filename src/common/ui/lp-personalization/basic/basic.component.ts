import {
    Component,
    Input,
    OnInit,
} from '@angular/core';

import { lpVideoModalConfig } from 'src/app/pages/public/landing/landing.config';
import { ModalService } from 'src/common/containers/modal/modal.service';

@Component({
  selector: 'lnd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {

    @Input()
    public text = '';

  constructor(
      private modalService: ModalService,
  ) { }

  ngOnInit(): void {

  }

    public playVideoInModal = (event) => {
        event.preventDefault();
        this.modalService
            .showModal$.next(lpVideoModalConfig());
    }

}
