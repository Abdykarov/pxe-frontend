import {
    Component,
    Input,
} from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class SupplyPointComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public title = 'Byt – Praha';

    public  titleSubtext = 'Běžný odběr (D0D1)';

    public firstRowValueName = 'Jistič';

    public firstRowValue = '3×10 A';

    public secondRowValueName = 'Spotřeba';

    public secondRowValue = 0.159515;

    public middleRowValueName = 'EAN';

    public middleRowValue = '123456789012';

    public priceLabel = 'Cena';

    public price = '660,00 Kč';

    public seasonPrice = '/ měsíc (Inogi)';
}


