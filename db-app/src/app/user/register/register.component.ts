import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { passwordConf } from './passwordConfirmation';
import { userNameCheck } from './userNameCheck';

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
    
    constructor(
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
            passwordConf('password', 'passwordConfirmation'), 
            userNameCheck('userName', this.userService)
        ]})
    }

    // Validates form and adds new user to database
    onSubmit() {
        const bcrypt = require('bcryptjs');

        bcrypt.hash(this.password.value, 10, (err, hash) => {
        
            // Catch error (such as the server is shutdown)
            if(err) {
                console.error(err);
            }

            else {

                /* May need to subscribe to the registering
                    user method. (Backend already confirms
                    for us) However that may not be necessary.
                    If so though it'll be here */

                // Send to server to register account
                this.userService.addUser({
                    firstName: this.firstName.value,
                    lastName: this.lastName.value,
                    userName: this.userName.value,
                    password: hash,
                    id: null,
                    userRole: "graduate"
                });

                /* Sends users back to login screen,
                    they'll need to contact admin
                    to confirm they can be a user  */
                this.router.navigate(['/login']);
            }
        });
    }

    // Getters for all inputs
    get form() { return this.registerationForm; }
    get firstName() { return this.registerationForm.get('firstName'); }
    get lastName() { return this.registerationForm.get('lastName'); }
    get userName() { return this.registerationForm.get('userName'); }
    get password() { return this.registerationForm.get('password'); }
    get passwordConfirmation() { return this.registerationForm.get('passwordConfirmation'); }
}