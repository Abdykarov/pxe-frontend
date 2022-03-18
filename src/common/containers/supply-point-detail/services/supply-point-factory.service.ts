import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointFormData,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Injectable()
export class SupplyPointFactoryService {
    constructor(private supplyService: SupplyService) {}

    public updateSupplyPointDetail(
        supplyPointFormData: ISupplyPointFormData
    ): Observable<any> {
        const supplyPoint: ISupplyPoint = R.pick(['name'], supplyPointFormData);

        switch (supplyPointFormData.commodityType) {
            case CommodityType.POWER:
                return this.createPower(supplyPointFormData, supplyPoint);
            case CommodityType.GAS:
                return this.createGas(supplyPointFormData, supplyPoint);
        }
    }

    private createPower(
        supplyPointFormData: ISupplyPointFormData,
        supplyPoint: ISupplyPoint
    ): Observable<any> {
        const powerAttributes: ISupplyPointPowerAttributes = R.pick(
            [
                'annualConsumptionNT',
                'annualConsumptionNTUnit',
                'annualConsumptionVT',
                'annualConsumptionVTUnit',
            ],
            supplyPointFormData
        );
        return this.supplyService.updatePowerSupplyPointWithContract(
            supplyPointFormData.id,
            supplyPoint,
            powerAttributes
        );
    }

    private createGas(
        supplyPointFormData: ISupplyPointFormData,
        supplyPoint: ISupplyPoint
    ): Observable<any> {
        const gasAttributes: ISupplyPointGasAttributes = R.pick(
            ['annualConsumption', 'annualConsumptionUnit'],
            supplyPointFormData
        );
        return this.supplyService.updateGasSupplyPointWithContract(
            supplyPointFormData.id,
            supplyPoint,
            gasAttributes
        );
    }
}
