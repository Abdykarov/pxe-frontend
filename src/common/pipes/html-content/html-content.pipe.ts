import {
    DomSanitizer,
    SafeHtml,
} from '@angular/platform-browser';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

@Pipe({
    name: 'htmlContent',
})
export class HtmlContentPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {}

    public transform(content: string): SafeHtml| string {
        return this.domSanitizer.bypassSecurityTrustHtml(this.convertContent(content));
    }

    public transformWithoutTrustHtml(content: string): string {
        return this.convertContent(content);
    }

    private convertContent = (content: string): string => {
        if (typeof content !== 'string') {
            return content;
        }

        const result =
            R.replace(new RegExp('@IMG\\[(.*?) (.*?)\\]', 'gm'), '<img class="card-img-top" src="https://squidex.lnd.bz/api/assets/$1" title="$2" alt="$2">')(content);

        return result;
    }
}
