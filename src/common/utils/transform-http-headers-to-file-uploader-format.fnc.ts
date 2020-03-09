import { HttpHeaders } from '@angular/common/http';

import * as R from 'ramda';

import { Headers } from 'src/third-sides/file-upload';

export const transformHttpHeadersToFileUploaderFormat = (httpHeaders: HttpHeaders): Headers[] => R.map(
        (key: string) => {
            return {
                name: key,
                value: httpHeaders.get(key),
            };
        },
    )(httpHeaders.keys());
