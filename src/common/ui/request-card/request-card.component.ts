import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    AllowedOperations,
    CommodityType,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { getConfigStepper } from 'src/common/utils';

@Component({
    selector: 'pxe-request-card',
    templateUrl: './request-card.component.html',
    styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
    public readonly allowedOperations = AllowedOperations;

    @Input()
    public supplyPoint: ISupplyPoint;

    @Output()
    public continueAction: EventEmitter<any> = new EventEmitter();

    @Output()
    public removeAction: EventEmitter<any> = new EventEmitter();

    public commodityType = CommodityType;

    public stepperProgressConfig: IStepperProgressItem[] = null;

    public allowPersonalDataStep = ProgressStatus.PERSONAL_DATA;

    ngOnInit(): void {
        this.stepperProgressConfig = getConfigStepper(
            this.supplyPoint.progressStatus,
            false
        );
    }
}
