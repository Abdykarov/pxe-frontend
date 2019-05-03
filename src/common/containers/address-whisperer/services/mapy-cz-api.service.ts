import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpParams,
} from '@angular/common/http';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import {
    IMapyCzResponse,
    IResultMapyCZResponse,
    IUserDataMapyCzResponse,
} from 'src/common/containers/address-whisperer/model/mapy-cz-response.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

@Injectable({
    providedIn: 'root',
})
export class MapyCzApiService {
    private static readonly MAPY_CZ_URL = 'https://api.mapy.cz/suggest/';

    constructor(
        private http: HttpClient,
    ) {}

    responeToResult = (resultMapyCz: IResultMapyCZResponse): IOption => {
        const userData: IUserDataMapyCzResponse = resultMapyCz.userData;
        return {
            label: `${userData.suggestFirstRow}, ${userData.suggestSecondRow}, ${userData.zipCode}`,
            value: `${userData.suggestFirstRow}, ${userData.suggestSecondRow}, ${userData.zipCode}`,
            key:   `${userData.suggestFirstRow}, ${userData.suggestSecondRow}, ${userData.zipCode}`,
        };
    }

    getPlaces(count: number, phrase: string) {
        const options = {
            params: new HttpParams()
                .set('count', String(count))
                .set('phrase', phrase)
                .set('category', 'address_cz'),
        };

        return this.http.get(MapyCzApiService.MAPY_CZ_URL, options)
            .pipe(
                map((response: IMapyCzResponse): Array<IOption>  => {
                    return R.map(this.responeToResult)(response.result);
                }),
            );
    }
}
