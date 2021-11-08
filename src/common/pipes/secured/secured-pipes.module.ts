import { NgModule } from '@angular/core';
import { DateDiffPipe } from './date-diff/date-diff.pipe';
import { IsDatePast } from './is-date-past/is-date-past.pipe';
import { NewSupplyWillBeginPipe } from './new-supply-will-begin/new-supply-will-begin.pipe';

// own classes

@NgModule({
    declarations: [DateDiffPipe, IsDatePast, NewSupplyWillBeginPipe],
    exports: [DateDiffPipe, IsDatePast, NewSupplyWillBeginPipe],
    providers: [DateDiffPipe, IsDatePast, NewSupplyWillBeginPipe],
})
export class SecuredPipesModule {}
