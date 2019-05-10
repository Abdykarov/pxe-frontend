import {
    Component,
    Input,
} from '@angular/core';

@Component({
    selector: 'pxe-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})

export class SupplyPointComponent {
    @Input()
    public title;

    @Input()
    public titleSubtext;

    @Input()
    public firstRowValueName;

    @Input()
    public firstRowValue;

    @Input()
    public secondRowValueName;

    @Input()
    public secondRowValue;

    @Input()
    public middleRowValueName;

    @Input()
    public middleRowValue;

    @Input()
    public priceLabel;

    @Input()
    public price;

    @Input()
    public seasonPrice;
}
