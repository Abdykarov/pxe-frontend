import { NgModule } from '@angular/core';

// own classes
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { ValuesPipe } from './values/values.pipe';
import { PluralPipe } from './plurar/plural.pipe';

@NgModule({
    declarations: [
        ConsumptionPipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
    exports: [
        ConsumptionPipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
    providers: [
        ConsumptionPipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
})

export class PipesModule {}
