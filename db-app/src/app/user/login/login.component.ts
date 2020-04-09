import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
//import { AuthenticationService } from '../../services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService : UserService,
        //private authenticationService: AuthenticationService
    ) {
       /* if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }*/
    }

    /* Load component */
    ngOnInit() {

        this.loginForm = this.formBuilder.group({
        
            // First name check
            username : new FormControl('', [
                Validators.required
            ]),
    
            // Last name check
            password : new FormControl('', [
                Validators.required
            ])
        })
    }

    /* Attempts to login with given creditials */
    onSubmit() {

        // Grab user collection
        this.userService.getUserCollection().subscribe(data => {
            const bcrypt = require('bcryptjs');
            var checkUser = false;
            var router = this.router;
            var pass = this.password;
            
            // Loops through to find matching username
            data.users.forEach(user => {

                // If username found, check password
                if(user.userName == this.username.value) {
                    checkUser = true;
                    
                    // Compare password
                    bcrypt.compare(this.password.value, user.password, function(err, res) {
                        
                        // Log error
                        if(err) { console.error(err) }

                        // If true, log in user
                        if(res == true) {
                            router.navigate(['/donor-table']);
                            console.log('ACCESS GRANTED');
                        }

                        // If invalid password, set flag
                        else { pass.setErrors({ loginCreditials: true}); }
                    });
                }
            });

            // If no matches are found, set errors
            if(checkUser == false) {                
                this.username.setErrors({ loginCreditials: true});
                this.password.setErrors({ loginCreditials: true});
            }

        });
    }

    /* Getter functions */
    get form() { return this.loginForm; }
    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }
}