import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';

import { TermsOfUseComponent } from './terms-of-use.component';
import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('TermOfUseComponent', () => {
    let component: TermsOfUseComponent;
    let fixture: ComponentFixture<TermsOfUseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TermsOfUseComponent,
            ],
            imports: [
                NotificationLayoutContainerModule,
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
