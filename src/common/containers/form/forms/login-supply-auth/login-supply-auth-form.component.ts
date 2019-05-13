import {
    Component, Input,
    OnInit,
} from '@angular/core';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pxe-login-supply-auth-form',
    templateUrl: './login-supply-auth-form.component.html',
    styleUrls: ['./login-supply-auth-form.component.scss'],
})
export class LoginSupplyAuthFormComponent extends AbstractFormComponent implements OnInit {

    @Input()
    public telephoneNumber: string;

    constructor(
        protected fb: FormBuilder,
        private route: ActivatedRoute,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
    }

}
