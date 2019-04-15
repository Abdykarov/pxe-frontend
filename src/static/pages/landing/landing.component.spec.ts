import { async,
         ComponentFixture,
         TestBed,
} from '@angular/core/testing';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LandingComponent } from './landing.component';
import { FormModule } from 'src/common/ui/forms/form.module';

describe('LandingComponent', () => {
    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;

    beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            LandingComponent,
        ],
        imports: [
            BreadcrumbModule,
            ButtonModule,
            FormModule,
        ],
    })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
