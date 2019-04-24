import { NgModule } from '@angular/core';

// own classes
import { ConsumptionPipe } from './consumption/consumption.pipe';
import { IsRouteActivePipe } from './is-route-active/is-route-acrive.pipe';
import { KeysPipe } from './keys/keys.pipe';
import { PluralPipe } from './plurar/plural.pipe';
import { ValuesPipe } from './values/values.pipe';

@NgModule({
    declarations: [
        ConsumptionPipe,
        IsRouteActivePipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
    exports: [
        ConsumptionPipe,
        IsRouteActivePipe,
        KeysPipe,
        PluralPipe,
        ValuesPipe,
    ],
    providers: [
        ConsumptionPipe,
        IsRouteActivePipe,
        KeysPipe,
        ValuesPipe,
        PluralPipe,
    ],
})
export class PipesModule {}
