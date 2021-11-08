import { HttpHeaders } from '@angular/common/http';
import * as R from 'ramda';
import { Headers } from 'src/third-sides/file-upload';

export const transformHttpHeadersToFileUploaderFormat = (
    httpHeaders: HttpHeaders
): Headers[] =>
    R.map(
        (name: string): Headers => ({
            name,
            value: httpHeaders.get(name),
        })
    )(httpHeaders.keys());
