import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';
import {
    IBenefit,
    IOffer,
} from 'src/common/graphql/models/offer.model';

@Pipe({
    name: 'accordionBenefits',
})
export class AccordionBenefitsPipe implements PipeTransform {
    transform(benefits: IBenefit[], supplyPointOffer: IOffer): IAccordionItem[] {
        if (!benefits) {
            return [];
        }

        return R.map((benefit: IBenefit): IAccordionItem => ({
            label: benefit.name,
            data: {
                benefit,
                supplyPointOffer,
            },
            isActive: false,
        }), benefits);
    }
}
