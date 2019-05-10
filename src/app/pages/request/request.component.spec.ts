import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RequestComponent } from './request.component';

describe('RequestComponent', () => {
    let component: RequestComponent;
    let fixture: ComponentFixture<RequestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RequestComponent,
            ],
            imports: [
                RouterTestingModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
