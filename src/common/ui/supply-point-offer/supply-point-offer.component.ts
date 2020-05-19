import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { CONSTS } from 'src/app/app.constants';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { FaqService } from 'src/app/services/faq.service';
import { IOffer } from 'src/common/graphql/models/offer.model';
import {
    IQuestion,
    Tag,
} from 'src/app/services/model/faq.model';
import { removeHtmlFromText, truncateText } from 'src/common/utils';

@Component({
    selector: 'pxe-supply-point-offer',
    templateUrl: './supply-point-offer.component.html',
    styleUrls: ['./supply-point-offer.component.scss'],
})
export class SupplyPointOfferComponent extends AbstractComponent implements OnInit {
    private static readonly MAX_HOURS_VALIDITY_OF_OFFER_DISPLAYED = 72;
    private static readonly MIN_HOURS_VALIDITY_OF_OFFER_DISPLAYED = 1;
    private static readonly ZERO_HOURS_VALIDITY_OF_OFFER = 0;

    private readonly maxLengthOfSupplierDescription = 100;

    public showPriceDecomposition = false;

    public currentTime = new Date();

    public COMMODITY_TYPE_POWER = CommodityType.POWER;
    public COMMODITY_TYPE_GAS = CommodityType.GAS;
    public CONSTS = CONSTS;

    public dateDiffValidityOfOffer = Number.MIN_VALUE;
    public math = Math;
    public showValidityOfOffer = false;
    public question: IQuestion = null;

    @Input()
    public supplyPointOffer: IOffer;

    @Input()
    public isOwner = false;

    @Input()
    public interactive = true;

    @Input()
    public isFromContract = false;

    @Output()
    public action: EventEmitter<any> = new EventEmitter();

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private faqService: FaqService,
    ) {
        super();
    }

    ngOnInit () {
        this.faqService.getQuestionStream()
            .pipe(
                filter((questions: IQuestion[]) => !R.isNil(questions)),
                takeUntil(this.destroy$),
            )
            .subscribe(
                (questions: IQuestion[]) => {
                    const vatNumber = R.path(['supplier', 'vatNumber'])(this.supplyPointOffer);
                    this.question = R.find(R.propEq('vatNumber', vatNumber))(questions);
                    if (this.question) {
                        this.question.shortContent =  R.pipe(
                            removeHtmlFromText,
                            R.curry(truncateText)(this.maxLengthOfSupplierDescription)(CONSTS.APPEND_AFTER_CUT_TEXT),
                        )(this.question.shortContent);
                        this.cd.markForCheck();
                    }
                },
            );

        this.dateDiffValidityOfOffer = this.dateDiffPipe.transform(
            this.currentTime.toISOString(),
            this.supplyPointOffer.validTo,
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
    }
}
