import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { PipesModule } from 'src/common/pipes/pipes.module';
import { ProgressBarComponent } from './progress-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SupplyProgressBarComponent', () => {
    let component: ProgressBarComponent;
    let fixture: ComponentFixture<ProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProgressBarComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
