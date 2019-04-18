import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { SupplyProgressBarComponent } from './supply-progress-bar.component';

describe('SupplyProgressBarComponent', () => {
    let component: SupplyProgressBarComponent;
    let fixture: ComponentFixture<SupplyProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SupplyProgressBarComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupplyProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
