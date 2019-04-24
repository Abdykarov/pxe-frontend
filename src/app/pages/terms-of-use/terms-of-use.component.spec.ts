import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { TermsOfUseComponent } from './terms-of-use.component';

describe('TermOfUseComponent', () => {
    let component: TermsOfUseComponent;
    let fixture: ComponentFixture<TermsOfUseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TermsOfUseComponent,
            ],
            imports: [
                LayoutContainerModule,
                RouterTestingModule.withRoutes([]),
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TermsOfUseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
