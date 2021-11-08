import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { map } from 'rxjs/operators';
import { REGIONS } from 'src/app/app.constants';
import {
    IMapyCzResponse,
    IResultMapyCZResponse,
    IUserDataMapyCzResponse,
} from 'src/common/containers/address-whisperer/model/address-whisperer.model';
import { IAddress } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class AddressWhispererService {
    private static readonly MAPY_CZ_URL = 'https://api.mapy.cz/suggest/';

    constructor(private http: HttpClient) {}

    private responseToResult = (
        resultMapyCz: IResultMapyCZResponse
    ): IAddress => {
        const userData: IUserDataMapyCzResponse = resultMapyCz.userData;
        let address: IAddress = null;
        if (userData.street || userData.ward) {
            address = {
                street: userData.street || userData.ward,
                orientationNumber: userData.streetNumber,
                descriptiveNumber: userData.houseNumber,
                city: userData.municipality,
                postCode: userData.zipCode,
                region:
                    userData.region ||
                    this.getRegion(userData.suggestSecondRow),
            };
        }
        return address;
    };

    private getRegion = (suggestSecondRow: string): any =>
        R.pipe(
            R.split(','),
            R.map(R.trim),
            R.find((string) => R.find(R.propEq('key')(string))(REGIONS)),
            R.defaultTo('')
        )(suggestSecondRow);

    public getPlaces = (count: number, phrase: string) => {
        const options = {
            params: new HttpParams()
                .set('count', String(count))
                .set('phrase', phrase)
                .set('category', 'address_cz,street_cz'),
        };

        return this.http.get(AddressWhispererService.MAPY_CZ_URL, options).pipe(
            map((response: IMapyCzResponse): Array<IAddress> => {
                return R.pipe(
                    R.map(this.responseToResult),
                    R.filter(R_.isNotNil)
                )(response.result);
            })
        );
    };
}
