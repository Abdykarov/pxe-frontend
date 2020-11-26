import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LpPersonalizationService } from './services/lp-personalization.service';

@Component({
  selector: 'lnd-lp-personalization-container',
  templateUrl: './lp-personalization-container.component.html',
  styleUrls: ['./lp-personalization-container.component.scss'],
})
export class LpPersonalizationContainerComponent implements OnInit {

    public currentPersonalization = '';

    constructor(
        private route: ActivatedRoute,
        private lpPersonalizationService: LpPersonalizationService,
    ) {}

    ngOnInit(): void {
        const fragment = this.route.snapshot.fragment;
        this.currentPersonalization = this.lpPersonalizationService.processPersonalization(fragment);
    }
}
