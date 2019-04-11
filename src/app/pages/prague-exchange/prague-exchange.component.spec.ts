import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { PragueExchangeComponent } from './prague-exchange.component';

describe('PragueExchangeComponent', () => {
    let component: PragueExchangeComponent;
    let fixture: ComponentFixture<PragueExchangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PragueExchangeComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PragueExchangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
