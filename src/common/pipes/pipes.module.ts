import { NgModule } from '@angular/core';

// own classes
import { KeysPipe } from './keys/keys.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        ValuesPipe,
    ],
    exports: [
        KeysPipe,
        ValuesPipe,
    ],
    providers: [
        KeysPipe,
        ValuesPipe,
    ],
})

export class PipesModule {}
