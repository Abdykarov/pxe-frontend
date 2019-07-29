import { Component } from '@angular/core';
import { CommodityType, ISupplyPoint, ProgressStatus } from 'src/common/graphql/models/supply.model';

@Component({
  templateUrl: './page.html',
})

export class DashboardComponent {

    public electricityPlacesCount = 2;
    public electricitySumOfPerformance = 1.002;
    public gasPlacesCount = 3;
    public gasSumOfPerformance = 4.784;


    public supplyPointsEnding: ISupplyPoint[] = [{
        id: '5456',
        name: 'Byt praha',
        allowedOperations: [],
        commodityType: CommodityType.POWER,
        supplier: {
            id: '',
            name: 'PRE',
            vatNumber: '',
            logoPath: '',
            sampleDocuments: [],
        },
        ean: '',
        address: null,
        distributionRate: null,
        circuitBreaker: null,
        phases: null,
        annualConsumptionNT: 0,
        annualConsumptionVT: 0,
        expirationDate: '0',
        subject: null,
        lastAnnualConsumptionNT: 0,
        lastAnnualConsumptionVT: 0,
        lastVersionOfSupplyPoint: false,
        contractEndType: null,
        timeToContractEnd: 0,
        timeToContractEndPeriod: null,
        contract: null,
        progressStatus: ProgressStatus.SUPPLY_POINT,
    }];


    newSupplyPointAction = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
