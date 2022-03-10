import { Component } from '@angular/core';
import {
    supplyPointConfigGas,
    supplyPointConfigPower,
} from 'src/static/organisms/supply-point/config';
import { NewSupplyPointPageConfig } from './config';

@Component({
    templateUrl: './page.html',
})
export class ListSupplyPointsPageComponent {
    public supplyPointGas = supplyPointConfigGas;
    public supplyPointPower = supplyPointConfigPower;

    constructor(public config: NewSupplyPointPageConfig) {}

    public supplyPointAction = () => console.log('Supply point clicked');
}
