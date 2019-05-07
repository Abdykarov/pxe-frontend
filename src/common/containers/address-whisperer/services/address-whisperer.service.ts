import {
    HttpClient,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import {
    IMapyCzResponse,
    IResultMapyCZResponse,
    IUserDataMapyCzResponse,
} from 'src/common/containers/address-whisperer/model/address-whisperer.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

@Injectable({
    providedIn: 'root',
})
export class AddressWhispererService {
    private static readonly MAPY_CZ_URL = 'https://api.mapy.cz/suggest/';

    constructor(
        private http: HttpClient,
    ) {}

    private responeToResult = (resultMapyCz: IResultMapyCZResponse): IOption => {
        const userData: IUserDataMapyCzResponse = resultMapyCz.userData;

        return {
            label: `${userData.suggestFirstRow}, ${userData.suggestSecondRow}, ${userData.zipCode}`,
            value: {
                street: userData.street,
                orientationNumber: userData.streetNumber,
                descriptiveNumber: userData.houseNumber,
                city: userData.municipality,
                postCode: userData.zipCode,
            },
            key: `${userData.suggestFirstRow}, ${userData.suggestSecondRow}, ${userData.zipCode}`,
        };
    }

    public getPlaces = (count: number, phrase: string) => {
        const options = {
            params: new HttpParams()
                .set('count', String(count))
                .set('phrase', phrase)
                .set('category', 'address_cz'),
        };

        return this.http.get(AddressWhispererService.MAPY_CZ_URL, options)
            .pipe(
                map((response: IMapyCzResponse): Array<IOption> => {
                    return R.map(this.responeToResult)(response.result);
                }),
            );
    }
}
