import { async,
         ComponentFixture,
         TestBed,
} from '@angular/core/testing';

import { LandingComponent } from './landing.component';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { MapCoverageModule } from 'src/common/ui/map-coverage/map-coverage.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { NewsSubscriptionModule } from '../../../common/ui/news-subscription/news-subscription.module';
import { SupplierModule } from '../../../common/ui/supplier/supplier.module';

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
                MapCoverageModule,
                NewsSubscriptionModule,
                SupplierModule,
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
