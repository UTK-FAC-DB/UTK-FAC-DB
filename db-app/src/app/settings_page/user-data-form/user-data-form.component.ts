import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDetails, TokenPayload, AuthenticationService } from '../../authentication/authentication.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { passwordConfirmation } from '../../user/register/userRegisterValidators';


@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserDataFormComponent implements OnInit {
  public userForm: FormGroup;
  public passwordForm: FormGroup;
  @Input() user: UserDetails;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // General user and priveleges form
    this.userForm = this.formBuilder.group({

      // First name check
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
        Validators.pattern('[A-Za-z-]*'),
      ]),

      // Last name check
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
        Validators.pattern('[A-Za-z-]*'),
      ]),

      // User name check
      userName: new FormControl(this.user.userName, [
        Validators.required,
        Validators.pattern('[A-Za-z1-9]*'),
      ]),

      // Donor Reg Privs
      donorRegCreatePriv: new FormControl(this.user.donorRegCreatePriv),
      donorRegEditPriv: new FormControl(this.user.donorRegEditPriv),
      donorRegDeletePriv: new FormControl(this.user.donorRegDeletePriv),

      // Donor Control Privs
      donorControlCreatePriv: new FormControl(this.user.donorControlCreatePriv),
      donorControlEditPriv: new FormControl(this.user.donorControlEditPriv),
      donorControlDeletePriv: new FormControl(this.user.donorControlDeletePriv),

      // Inventory Privs
      inventoryCreatePriv: new FormControl(this.user.inventoryCreatePriv),
      inventoryEditPriv: new FormControl(this.user.inventoryEditPriv),
      inventoryDeletePriv: new FormControl(this.user.inventoryDeletePriv),

      // Donor Metrics Privs
      donorMetricCreatePriv: new FormControl(this.user.donorMetricCreatePriv),
      donorMetricEditPriv: new FormControl(this.user.donorMetricEditPriv),
      donorMetricDeletePriv: new FormControl(this.user.donorMetricDeletePriv),
    });

    // Password form
    this.passwordForm = this.formBuilder.group({

      // Password
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        ),
      ]),

      // Double checks password validity
      passwordConfirmation: new FormControl('', [
        Validators.required
      ])
    },
      {
        validators: [
          passwordConfirmation('password', 'passwordConfirmation')
        ]
      });
  }

  // Whether is expanded or not
  expandedElement: UserDetails | null;

  // Saving user to db
  onSave(): void {

    // Set up token and edits
    var token: TokenPayload = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      userName: this.userName.value,
      donorRegEditPriv: this.donorRegEditPriv.value,
      donorRegCreatePriv: this.donorRegCreatePriv.value,
      donorRegDeletePriv: this.donorRegDeletePriv.value,
      donorControlEditPriv: this.donorControlEditPriv.value,
      donorControlCreatePriv: this.donorControlCreatePriv.value,
      donorControlDeletePriv: this.donorControlDeletePriv.value,
      inventoryEditPriv: this.inventoryEditPriv.value,
      inventoryCreatePriv: this.inventoryCreatePriv.value,
      inventoryDeletePriv: this.inventoryDeletePriv.value,
      donorMetricEditPriv: this.donorMetricEditPriv.value,
      donorMetricCreatePriv: this.donorMetricCreatePriv.value,
      donorMetricDeletePriv: this.donorMetricDeletePriv.value,
      _id: this.user._id,
    };

    // Test prints
    console.log("SAVING " + this.user.userName);
    console.log(this.user);
    console.log(token);

    // Check username
    this.auth.checkUsernamePost(token).subscribe(() => {

      // Update user in backend
      this.auth.updateUser(token).subscribe(() => {
        window.location.reload();
      }, (err) => {
        console.error(err);
      });
    },
      // Invalidate username field
      (err) => {
        console.error(err);
        this.userName.setErrors({ userNameCheck: true });
      });


  }

  // This is the pop up functionality for changing password Pop up
  popChange = false;
  openChange() { this.popChange = true; }
  cancelChange() { this.popChange = false; }
  onChangePassword(): void {

    // Close prompt
    this.popChange = false;

    // Test print
    console.log("CHANGING " + this.user.userName + " PASSWORD");

    // Set up token and edits
    var token: TokenPayload = {
      _id: this.user._id,
      userName: this.userName.value,
      password: this.password.value,
    };

    // Execute changing of password and reset page
    this.auth.changePassword(token).subscribe(() => {
      window.location.reload();
    }, (err) => {
      console.error(err);
    });
  }

  // Deleting functionality
  popDelete = false;
  openDelete() { this.popDelete = true; }
  cancelDelete() { this.popDelete = false; }
  onDelete(): void {

    // Close prompt
    this.popDelete = false;

    // Set up token and edits
    var token: TokenPayload = {
      _id: this.user._id,
    };

    // Test print
    console.log("DELETING " + this.user.userName);

    // Update user in backend
    this.auth.deleteUser(token).subscribe(() => {
      window.location.reload();
    }, (err) => {
      console.error(err);
    });
  }

  get formUser() { return this.userForm; }
  get formPassword() { return this.passwordForm; }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get userName() { return this.userForm.get('userName'); }
  get donorRegEditPriv() { return this.userForm.get('donorRegEditPriv'); }
  get donorRegCreatePriv() { return this.userForm.get('donorRegCreatePriv'); }
  get donorRegDeletePriv() { return this.userForm.get('donorRegDeletePriv'); }
  get donorControlEditPriv() { return this.userForm.get('donorControlEditPriv'); }
  get donorControlCreatePriv() { return this.userForm.get('donorControlCreatePriv'); }
  get donorControlDeletePriv() { return this.userForm.get('donorControlDeletePriv'); }
  get inventoryEditPriv() { return this.userForm.get('inventoryEditPriv'); }
  get inventoryCreatePriv() { return this.userForm.get('inventoryCreatePriv'); }
  get inventoryDeletePriv() { return this.userForm.get('inventoryDeletePriv'); }
  get donorMetricEditPriv() { return this.userForm.get('donorMetricEditPriv'); }
  get donorMetricCreatePriv() { return this.userForm.get('donorMetricCreatePriv'); }
  get donorMetricDeletePriv() { return this.userForm.get('donorMetricDeletePriv'); }
  get password() { return this.passwordForm.get('password'); }
  get passwordConfirmation() { return this.passwordForm.get('passwordConfirmation'); }
}

