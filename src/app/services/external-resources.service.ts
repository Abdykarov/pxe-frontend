import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as R from 'ramda';
import { externalScripts, externalStyles } from 'src/app/app.constants';
import {
    IExternalPromise,
    IExternalResource,
    ExternalResourceType,
} from 'src/app/services/model/widget.model';
import { v4 as generateUuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class ScriptService {
    private resources = {
        [ExternalResourceType.scripts]: {},
        [ExternalResourceType.styles]: {},
    };
    private widgetScripts = externalScripts;
    private widgetStyles = externalStyles;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        R.forEach((script: IExternalResource) => {
            this.resources[ExternalResourceType.scripts][script.name] = {
                loaded: false,
                src: script.src,
            };
        })(this.widgetScripts);
        R.forEach((script: IExternalResource) => {
            this.resources[ExternalResourceType.styles][script.name] = {
                loaded: false,
                src: script.src,
            };
        })(this.widgetStyles);
    }

    public generateId(prefix = '') {
        return `${prefix}id-${generateUuid()}`;
    }

    public load(
        type: ExternalResourceType,
        ...scripts: string[]
    ): Promise<IExternalPromise[]> {
        if (isPlatformBrowser(this.platformId)) {
            const promises: Promise<IExternalPromise>[] = R.map((script) =>
                this.loadResource(type, script),
            )([...scripts]);
            return Promise.all(promises);
        } else {
            return Promise.reject();
        }
    }

    public loadStatic(type = ExternalResourceType.scripts, name: string): void {
        const resource = this.createResource(type, name);
        this.document.getElementsByTagName('head')[0].appendChild(resource);
    }

    private createResource(
        type = ExternalResourceType.scripts,
        name: string,
    ): HTMLElement {
        let resource;
        if (type === 'scripts') {
            resource = this.document.createElement('script');
            resource.type = 'text/javascript';
            resource.src = this.resources[type][name].src;
            resource.defer = true;
            resource.async = false;
        } else {
            resource = this.document.createElement('link');
            resource.type = 'text/css';
            resource.rel = 'stylesheet';
            resource.href = this.resources[type][name].src;
        }
        return resource;
    }

    private loadResource(
        type = ExternalResourceType.scripts,
        name: string,
    ): Promise<IExternalPromise> {
        return new Promise((resolve, reject) => {
            if (this.resources[type][name].loaded) {
                resolve({
                    script: name,
                    loaded: true,
                    status: 'Already Loaded',
                });
            } else {
                const resource = this.createResource(type, name);

                resource.onload = () => {
                    this.resources[type][name].loaded = true;
                    resolve({
                        script: name,
                        loaded: true,
                        status: 'Loaded',
                    });
                };

                resource.onerror = () =>
                    resolve({
                        script: name,
                        loaded: false,
                        status: 'Loaded with error',
                    });

                this.document
                    .getElementsByTagName('head')[0]
                    .appendChild(resource);
            }
        });
    }
}
