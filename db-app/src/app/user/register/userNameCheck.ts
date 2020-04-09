import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

// Custom validator to check for a specific username is already in use
export function userNameCheck(userName: string, userService : UserService) {
    return (formGroup: FormGroup) => {
        const userNameControl = formGroup.controls[userName];

        // Grab user collection
        userService.getUserCollection().subscribe(data => {
            
            // Go through users and find any matches (yes slow, but works)
            data.users.forEach(user => {
                if(user.userName == userNameControl.value) {
                    userNameControl.setErrors({ userNameCheck: true});
                }
            })

        });
    }
}
