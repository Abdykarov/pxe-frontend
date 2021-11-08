import { Component } from '@angular/core';
import { AbstractComponent } from 'src/common/abstract.component';

@Component({
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent extends AbstractComponent {
    constructor() {
        super();
    }
}
