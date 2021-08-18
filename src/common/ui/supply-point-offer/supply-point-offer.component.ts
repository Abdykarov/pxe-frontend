import {
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { CONSTS } from 'src/app/app.constants';

import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { DateDiffPipe } from 'src/common/pipes/secured/date-diff/date-diff.pipe';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';
import { IQuestion } from 'src/app/services/model/faq.model';
import { removeHtmlFromText } from 'src/common/utils';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {

    private static readonly MAX_HOURS_VALIDITY_OF_OFFER_DISPLAYED = 72;
    private static readonly MIN_HOURS_VALIDITY_OF_OFFER_DISPLAYED = 1;
    private static readonly ZERO_HOURS_VALIDITY_OF_OFFER = 0;

    public showPriceDecomposition = false;

    public currentTime = new Date();

    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public COMMODITY_TYPE_GAS = CommodityType.GAS;

    public dateDiffValidityOfOffer = Number.MIN_VALUE;
    public math = Math;
    public showValidityOfOffer = false;
    public question: IQuestion = null;

    @Input()
    public questions: IQuestion[] = null;

    @Input()
    public personalInfo: IPersonalData = null;

    @Input()
    public supplyPointOffer: IOffer;

    @Input()
    public isOwner = false;

    @Input()
    public offerSelected = false;

    @Input()
    public interactive = true;

    @Input()
    public isFromContract = false;

    @Input()
    public customClass = '';

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    @Output()
    public togglePriceDecompositionAction: EventEmitter<any> = new EventEmitter();

    @ViewChild('supplyPointOfferWrapper', { read: ElementRef })
    public supplyPointOfferWrapper: ElementRef;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
    ) {
        super();
    }

    ngOnInit () {
        if (this.isFromContract) {
            this.showPriceDecomposition = true;
        }

        if ( this.questions) {
            const vatNumber = R.path(['supplier', 'vatNumber'])(this.supplyPointOffer);
            this.question = {...R.find(R.propEq('vatNumber', vatNumber))(this.questions)};

            if (!R.isEmpty(this.question)) {
                const textWithoutHTML = removeHtmlFromText(this.question.shortContent);
                const indexOfLastWord = textWithoutHTML.substr(CONSTS.MAX_LENGTH_SUPPLIER_DESCRIPTION).indexOf(' ');
                this.question.shortContent =  R.pipe(
                    R.take(indexOfLastWord + CONSTS.MAX_LENGTH_SUPPLIER_DESCRIPTION),
                    (text) => `${text}${CONSTS.APPEND_AFTER_CUT_TEXT}`,
                )(textWithoutHTML);
            }

            if (this.isFromContract) {
                this.showPriceDecomposition = true;
            }
        }

        this.dateDiffValidityOfOffer = this.dateDiffPipe.transform(
            this.currentTime.toISOString(),
            moment(this.supplyPointOffer.validTo).endOf('day'),
            'hours',
        );

        this.dateDiffValidityOfOffer =
            this.dateDiffValidityOfOffer === SupplyPointOfferComponent.ZERO_HOURS_VALIDITY_OF_OFFER ?
                SupplyPointOfferComponent.MIN_HOURS_VALIDITY_OF_OFFER_DISPLAYED : this.dateDiffValidityOfOffer;

        if (this.dateDiffValidityOfOffer <= SupplyPointOfferComponent.MAX_HOURS_VALIDITY_OF_OFFER_DISPLAYED &&
            this.dateDiffValidityOfOffer > 0) {
            this.showValidityOfOffer = true;
        }

        if (R_.isString(this.supplyPointOffer.benefits)) {
            try {
                this.supplyPointOffer.benefits = JSON.parse(<string>this.supplyPointOffer.benefits);
            } catch (e) {
                this.supplyPointOffer.benefits = null;
            }
        }
    }

    public togglePriceDecomposition = (event) => {
        event.preventDefault();
        event.cancelBubble = true;
        this.showPriceDecomposition = !this.showPriceDecomposition;
        this.togglePriceDecompositionAction.emit(this.showPriceDecomposition);
    }
}
