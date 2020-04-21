import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { passwordConfirmation, userNameCheck } from './userRegisterValidators';
import { AuthenticationService, TokenPayload } from '../../authentication.service';

/* Registeraton component */
@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
    public registerationForm : FormGroup;
    _dataStream = new BehaviorSubject<User[]>([]);
    public get data(): User[] { return this._dataStream.value; }
    public set data(v: User[]) { this._dataStream.next(v); }

    // User data token
    registerData: TokenPayload = {
        userName: '',
        userRole: 'graduate',
        firstName: '',
        lastName: '',
        password: ''
      };
    
    constructor(
        private auth: AuthenticationService,
        private formBuilder : FormBuilder, 
        private userService : UserService,
        private router : Router
    ) { } 

    /* Initializes the form */
    ngOnInit() { 
        
        // Form inputs and validators
        this.registerationForm = this.formBuilder.group({
        
            // First name check
            firstName : new FormControl('', [
                Validators.required,
                Validators.pattern('[A-Za-z-]*'),
            ]),
    
            // Last name check
            lastName : new FormControl('', [
                Validators.required,
                Validators.pattern('[A-Za-z-]*'),
            ]),
    
            // User name check
            userName : new FormControl('', [
                Validators.required,
                Validators.pattern('[A-Za-z1-9]*'),
            ]),
    
            /* 
            Password requirements:
            - 8 chars
            - 1 lower case
            - 1 upper case
            - 1 special charcter
            */
            password : new FormControl('', [
                Validators.required,
                Validators.pattern(
                    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
                ),
            ]),
    
            // Double checks password validity
            passwordConfirmation : new FormControl('', [
                Validators.required
            ])
        }, 
        {validators: [
            passwordConfirmation('password', 'passwordConfirmation'), 
            userNameCheck('userName', this.userService)
        ]})
    }

    // Validates form and adds new user to database
    onSubmit() {

        console.log("Trying to make new user");

        // Set form data to register data
        this.registerData.firstName = this.firstName.value;
        this.registerData.lastName = this.lastName.value;
        this.registerData.userName = this.userName.value;
        this.registerData.password = this.password.value;
    
        // Register new user
        this.auth.register(this.registerData).subscribe(() => {
            this.router.navigateByUrl('/login');
        }, (err) => {
            console.error(err);
        });

        //
        //this.router.navigateByUrl('/login');
    }

    // Getters for all inputs
    get form() { return this.registerationForm; }
    get firstName() { return this.registerationForm.get('firstName'); }
    get lastName() { return this.registerationForm.get('lastName'); }
    get userName() { return this.registerationForm.get('userName'); }
    get password() { return this.registerationForm.get('password'); }
    get passwordConfirmation() { return this.registerationForm.get('passwordConfirmation'); }
}