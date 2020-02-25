import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FileService {
    public saveAsCSV(content: string) {
        const a = document.createElement('a');
        const blob = new Blob([content], {type: 'text/csv' }),
            url = window.URL.createObjectURL(blob);

        a.href = url;
        a.download = 'myFile.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
