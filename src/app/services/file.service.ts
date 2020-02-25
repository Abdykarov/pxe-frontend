import { Injectable } from '@angular/core';

import { CONSTS } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    public saveAsCSV(content: string) {
        const a = document.createElement('a');
        const blob = new Blob([content], {type: 'text/csv' }),
            url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = `${CONSTS.EXPORT.FILE_NAME}_${new Date().toISOString()}.${CONSTS.EXPORT.TYPE}`;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
