import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ApolloModule } from 'apollo-angular';
import { CookieModule } from 'ngx-cookie';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

import { LoginComponent } from './login-page.component';
import { LoginRoutingModule } from './login-routing.module';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
            ],
            imports: [
                ApolloModule,
                AlertModule,
                ButtonModule,
                CookieModule.forRoot(),
                FormModule,
                HttpClientModule,
                LoginRoutingModule,
                ModalModule,
                ReactiveFormsModule,
                RouterTestingModule,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
