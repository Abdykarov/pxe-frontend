import { ActivatedRoute, Router } from '@angular/router';
import {
    Component,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS, ROUTES } from '../../app.constants';
import { takeUntil } from 'rxjs/operators';

import { NewSupplyPointPageConfig } from '../../../static/pages/new-supply-point/config';
import { SupplyOfferConfig } from './supply-offer.config';
import { FormControl, FormGroup } from '@angular/forms';
import { formFields } from '../../../common/containers/form/forms/supply-offer/supply-offer-form.config';
import { IFieldError } from '../../../common/containers/form/models/form-definition.model';
import { CommodityType, ISupplyPointFormData } from '../../../common/graphql/models/supply.model';

export const tableCols = {
    main: [
        {
            label: 'First column',
            views: [
                {
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.first.a}</span>${row.first.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.first.a} ${row.first.b}`,
                },
            ],
        },
        {
            label: 'Second column',
            views: [
                {
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.second.a}</span>${row.second.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.second.a} ${row.second.b}`,
                },
            ],
        },
        {
            label: 'Third column',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-30'],
                    cellClass: ['w-30'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.third.a}</span>${row.third.b}`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.third.a}</span>${row.third.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.third.a} ${row.third.b}`,
                },
            ],
        },
        {
            label: 'Fourth column',
            views: [
                {
                    showIn: ['xl'],
                    headingClass: ['w-20'],
                    cellClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.fourth.a}</span>${row.fourth.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.fourth.a} ${row.fourth.b}`,
                },
            ],
        },
        {
            label: 'Last column',
            views: [
                {
                    showIn: ['md', 'lg'],
                    headingClass: ['w-30'],
                    cellClass: ['w-30'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.last.a}</span>${row.last.b}`,
                },
                {
                    showIn: ['xl'],
                    headingClass: ['w-20'],
                    content: (row) => `<span class="d-block font-weight-bold">${row.last.a}</span>${row.last.b}`,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => `${row.last.a} ${row.last.b}`,
                },
            ],
        },
    ],
    detail: [
        {
            label: 'First detail column',
            views: [
                {
                    content: (row) => row.first,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.first,
                },
            ],
        },
        {
            label: 'Second detail column',
            views: [
                {
                    content: (row) => row.second,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.second,
                },
            ],
        },
        {
            label: 'Third detail column',
            views: [
                {
                    content: (row) => row.third,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.third,
                },
            ],
        },
        {
            label: 'Last detail column',
            views: [
                {
                    content: (row) => row.last,
                },
            ],
            mobileViews: [
                {
                    cellClass: ['font-weight-bold', 'text-right'],
                    content: (row) => row.last,
                },
            ],
        },
    ],
};

export const tableRows = {
    main: [
        {
            first: { a: 'First row', b: 'first cell' },
            second: { a: 'First row', b: 'second cell'},
            third: { a: 'First row', b: 'third cell'},
            fourth: { a: 'First row', b: 'fourth cell'},
            last: { a: 'First row', b: 'last cell'},
        },
        {
            first: { a: 'Second row', b: 'first cell'},
            second: { a: 'Second row', b: 'second cell'},
            third: { a: 'Second row', b: 'third cell'},
            fourth: { a: 'Second row', b: 'fourth cell'},
            last: { a: 'Second row', b: 'last cell'},
        },
        {
            first: { a: 'Third row', b: 'first cell'},
            second: { a: 'Third row', b: 'second cell'},
            third: { a: 'Third row', b: 'third cell'},
            fourth: { a: 'Third row', b: 'fourth cell'},
            last: { a: 'Third row', b: 'last cell'},
        },
        {
            first: { a: 'Last row', b: 'first cell'},
            second: { a: 'Last row', b: 'second cell'},
            third: { a: 'Last row', b: 'third cell'},
            fourth: { a: 'Last row', b: 'fourth cell'},
            last: { a: 'Last row ', b: 'last cell'},
        },
    ],
    detail: [
        {
            first: 'First row first cell',
            second: 'First row second cell',
            third: 'First row third cell',
            last: 'First row last cell',
        },
        {
            first: 'Second row first cell',
            second: 'Second row second cell',
            third: 'Second row third cell',
            last: 'Second row last cell',
        },
        {
            first: 'Third row first cell',
            second: 'Third row second cell',
            third: 'Third row third cell',
            last: 'Third row last cell',
        },
        {
            first: 'Last row first cell',
            second: 'Last row second cell',
            third: 'Last row third cell',
            last: 'Last row last cell',
        },
    ],
};


@Component({
    selector: 'pxe-supply-offer',
    templateUrl: './supply-offer.component.html',
    styleUrls: [
        './supply-offer.component.css',
    ],
})
export class SupplyOfferComponent extends AbstractComponent implements OnInit {
    public commodityType = CommodityType.POWER;
    public routePower = ROUTES.ROUTER_SUPPLY_OFFER_POWER;
    public routeGas = ROUTES.ROUTER_SUPPLY_OFFER_GAS;

    public form: FormGroup = new FormGroup({
        distributionLocation: new FormControl(),
        distributionRateId: new FormControl(),
        circuitBreakerId: new FormControl(),
        deliveryLength: new FormControl(),
        subjectTypeId: new FormControl(),
        annualConsumptionId: new FormControl(),
        validFrom: new FormControl(),
        validTo: new FormControl(),
        validFromTo: new FormControl(),
        deliveryFrom: new FormControl(),
        deliveryTo: new FormControl(),
        deliveryFromTo: new FormControl(),
    });

    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public supplyOfferConfig: SupplyOfferConfig,
        public newSupplyPointPageConfig: NewSupplyPointPageConfig,
    ) {
        super();
    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                console.log('%c ***** params *****', 'background: #bada55; color: #000; font-weight: bold', params, Object.values(CommodityType));
                if (params.commodityType !== 'power' && params.commodityType !== 'gas') {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.commodityType = params.commodityType === 'power' ? CommodityType.POWER : CommodityType.GAS;
            });
    }

    public edit = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public create = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public duplicate = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public delete = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public rowOpened = (row) => {
        console.log('%c ***** rowOpened *****', 'background: #bada55; color: #000; font-weight: bold', row);
    }

    public rowSelected = (row) => {
        console.log('%c ***** rowSelected *****', 'background: #bada55; color: #000; font-weight: bold', row);
    }

    public submitSupplyForm = (supplyOfferFormData: any) => {
        console.log('%c ***** submitSupplyForm *****', 'background: #bada55; color: #000; font-weight: bold', supplyOfferFormData);
    }
}
