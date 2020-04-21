import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthenticationService, TokenPayload } from '../../authentication.service';

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

// Custom validator to check for a specific username is already in use
export function userNameCheck(userName: string, auth : AuthenticationService) {
    return (formGroup: FormGroup) => {
        const userNameControl = formGroup.controls[userName];

        // Grabs login data
        var nameData: TokenPayload = {
            userName: userNameControl.value,
            password: ''
        };

        // Login user to check for username
        auth.isValidUsername(nameData).subscribe(() => {
        }, (err) => {
            console.error(err);
            /*
            this.username.setErrors({ loginCreditials: true});
            this.password.setErrors({ loginCreditials: true});*/
        }); 

        // Grab user collection
        /*userService.getUserCollection().subscribe(data => {
            
            // Go through users and find any matches (yes slow, but works)
            data.users.forEach(user => {
                if(user.userName == userNameControl.value) {
                    userNameControl.setErrors({ userNameCheck: true});
                }
            })

        });*/
    }
}

