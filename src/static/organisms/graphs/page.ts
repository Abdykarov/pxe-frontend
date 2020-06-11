import { Component } from '@angular/core';

import {
    config,
    config2,
    config3,
} from 'src/static/organisms/graphs/config';

@Component({
    templateUrl: './page.html',
})
export class GraphsPageComponent {
    public barData = config;
    public barData2 = config2;

    public gaussianDistribution = config3;

    public mouseMove = (evt) => {
        console.log('MOUSE MOVE');
        console.log(evt);
    }
}
