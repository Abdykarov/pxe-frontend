import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { IBenefit } from 'src/common/graphql/models/offer.model';
import { IAccordionItem } from 'src/common/ui/accordion/models/accordion-item.model';

@Pipe({
    name: 'accordionBenefits',
})
export class AccordionBenefitsPipe implements PipeTransform {
    transform(benefits: IBenefit[]): IAccordionItem[] {
        if (!benefits) {
            return [];
        }

        return R.map((benefit: IBenefit): IAccordionItem => ({
            label: benefit.name,
            data: benefit,
            isActive: false,
        }), benefits);
    }
}
