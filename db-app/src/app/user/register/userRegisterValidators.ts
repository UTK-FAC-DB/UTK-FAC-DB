import { FormGroup } from '@angular/forms';

// Custom validator to check that two fields match
export function passwordConfirmation(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // Return if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors.passwordConf) {
            return;
        }

        // Set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordConf: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

