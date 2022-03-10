import { Component } from '@angular/core';
import {
    supplyPointConfig,
    supplyPointConfig2,
} from 'src/static/organisms/request-card/config';

@Component({
    templateUrl: './page.html',
})
export class RequestComponent {
    public supplyPoint = supplyPointConfig;
    public supplyPoint2 = supplyPointConfig2;

    public action = (data) => {
        console.log('CLICKED', data);
    };
}
