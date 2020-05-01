import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDetails, TokenPayload, AuthenticationService } from '../../authentication/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

/* 
Got a lot of this example from the 'Table with expandable rows'
example at https://material.angular.io/components/table/examples 
*/

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SettingsComponent implements OnInit {
  users: UserDetails[];
  public registerationForm: FormGroup;

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
    private formBuilder: FormBuilder
  ) { }

  // On init will need to grab the user collection from the db
  ngOnInit(): void {
    console.log("Trying to get user collection");

    // Grabs the users
    this.auth.getUserCollection().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }, (err) => {
      console.error(err);
    });

    // Form inputs and validators
    this.registerationForm = this.formBuilder.group({

      // First name check
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z-]*'),
      ]),

      // Last name check
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z-]*'),
      ]),

      // User name check
      userName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z1-9]*'),
      ])
    });


  }

  // Column headers
  columnsToDisplay = ['firstName', 'lastName', 'userName', 'userRole'];

  // Whether is expanded or not
  expandedElement: UserDetails | null;

  // Saving user to db
  onSave(user: UserDetails): void {
    var token: TokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      _id: user._id,
    };

    console.log("SAVING " + user.userName);
    console.log(user);
    console.log(token);

    // Update user in backend
    this.auth.updateUser(token).subscribe(() => {
      //window.location.reload();
    }, (err) => {
      console.error(err);
    });
  }

  // Changing password
  onChangePassword(user: UserDetails): void {
    console.log("CHANGING " + user.userName);

    // Execute pop up
  }

  // Delete user from db
  onDelete(user: UserDetails): void {
    var token: TokenPayload;

    console.log("DELETING " + user.userName);

    // Set up new token data
    token.firstName = user.firstName;
    token.lastName = user.lastName;
    token.userName = user.userName;
    token.password = user.password;

    // Update user in backend
    this.auth.deleteUser(token).subscribe(() => {
      window.location.reload();
    }, (err) => {
      console.error(err);
    });
  }
}