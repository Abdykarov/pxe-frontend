import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Pipe({
    name: 'valueOfForm',
})
export class ValueOfFormPipe implements PipeTransform {
    transform(form: FormGroup, path: string): FormArray | AbstractControl {
        if (!form || !path) {
            return null;
        }

        return form.get(path);
    }
}
