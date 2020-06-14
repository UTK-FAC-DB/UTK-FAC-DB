import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from 'src/app/authentication/authentication.service';

@Component({
    templateUrl: 'login.component.html', 
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    // Grabs login data
    loginData: TokenPayload = {
        userName: '',
        password: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthenticationService
    ) { }

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

        // Set data for potential user
        this.loginData.userName = this.username.value;
        this.loginData.password = this.password.value;
     
        // Login user
        this.auth.login(this.loginData).subscribe(() => {
            this.router.navigateByUrl('/');
        }, (err) => {
            console.error(err);
            this.username.setErrors({ loginCreditials: true});
            this.password.setErrors({ loginCreditials: true});
        }); 
    }

    /* Getter functions */
    get form() { return this.loginForm; }
    get username() { return this.loginForm.get('username'); }
    get password() { return this.loginForm.get('password'); }
}