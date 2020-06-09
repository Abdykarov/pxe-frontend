import { Component } from '@angular/core';

import { config, config2 } from 'src/static/organisms/graphs/config';

@Component({
  templateUrl: './page.html',
})
export class GraphsPageComponent {
    public barData = config;
    public barData2 = config2;
}
