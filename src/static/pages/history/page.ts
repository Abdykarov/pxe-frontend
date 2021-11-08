import { Component } from '@angular/core';
import { IHistory } from 'src/common/containers/history/models/history';
import { supplyPointConfigPower } from 'src/static/organisms/supply-point/config';

@Component({
    templateUrl: './page.html',
})
export class HistoryComponent {
    public history: IHistory = {
        2020: [supplyPointConfigPower, supplyPointConfigPower],
        2019: [supplyPointConfigPower],
        2018: [
            supplyPointConfigPower,
            supplyPointConfigPower,
            supplyPointConfigPower,
        ],
    };
}
