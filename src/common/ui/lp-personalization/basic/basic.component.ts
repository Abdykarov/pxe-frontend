import { Component, Input, OnInit } from '@angular/core';
import {lpVideoModalConfig} from '../../../../app/pages/landing/landing.config';
import {ModalService} from '../../../containers/modal/modal.service';

@Component({
  selector: 'lnd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {

    @Input()
    public text = 'aaa';

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
