import {
    DomSanitizer,
    SafeHtml,
} from '@angular/platform-browser';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import { environment } from 'src/environments/environment';

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
            R.replace(new RegExp('@IMG\\[(.*?) (.*?) (.*?)\\]', 'gm'), '<img class="card-img-top $3" src="' + environment.url_cms_assets + '$1" title="$2" alt="$2">')(content);

        return result;
    }
}
