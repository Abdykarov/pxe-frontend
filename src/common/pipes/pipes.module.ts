import { NgModule } from '@angular/core';

// own classes
import { KeysPipe } from './keys/keys.pipe';
import { SplitLastPipe } from './split-last/split-last.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        SplitLastPipe,
        ValuesPipe,
    ],
    exports: [
        KeysPipe,
        SplitLastPipe,
        ValuesPipe,
    ],
    providers: [
        KeysPipe,
        SplitLastPipe,
        ValuesPipe,
    ],
})

export class PipesModule {}
