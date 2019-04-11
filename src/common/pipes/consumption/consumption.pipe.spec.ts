import { DecimalPipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeCs from '@angular/common/locales/cs';
import localeCsExtra from '@angular/common/locales/extra/cs';
import { TestBed } from '@angular/core/testing';

import { ConsumptionPipe } from './consumption.pipe';
import { RESULT_TYPE_CONSUMPTION } from './model/consumption-model';


describe('ConsumptionPipe', () => {
    let pipe: ConsumptionPipe;

    beforeEach(() => {
        registerLocaleData(localeCs, localeCsExtra);

        TestBed.configureTestingModule({
            providers: [
                ConsumptionPipe,
                DecimalPipe,
                {
                    provide: LOCALE_ID,
                    useValue: 'cs-CZ',
                },
            ],
        });

        pipe = TestBed.get(ConsumptionPipe);
    });

    it('create an instance', () => expect(pipe).toBeTruthy());

    it('999 should result 999,0 Wh', () => {
        expect(pipe.transform(999, RESULT_TYPE_CONSUMPTION.BOTH)).toEqual('999 Wh');
    });

    it('1000 should result 1 KWh', () => {
        expect(pipe.transform(1000, RESULT_TYPE_CONSUMPTION.BOTH)).toEqual('1 KWh');
    });

    it('999 999 should result 1 000 KWh', () => {
        expect(pipe.transform(999999, RESULT_TYPE_CONSUMPTION.BOTH)).toEqual('1 000 KWh');
    });

    it('1 000 000 should result 1 MWh', () => {
        expect(pipe.transform(1000000, RESULT_TYPE_CONSUMPTION.BOTH)).toEqual('1 MWh');
    });

    it('999 999 999 should result 1000 MWh', () => {
        expect(pipe.transform(999999999, RESULT_TYPE_CONSUMPTION.BOTH)).toEqual('1 000 MWh');
    });

    it('1 000 000 000 should result 1 GWh', () => {
        expect(pipe.transform(1000000000, RESULT_TYPE_CONSUMPTION.BOTH)).toEqual('1 GWh');
    });
 });
