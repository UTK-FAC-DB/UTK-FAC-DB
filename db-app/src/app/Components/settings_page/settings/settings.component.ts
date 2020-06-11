import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDetails, AuthenticationService } from 'src/app/authentication/authentication.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

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
  pUsers: UserDetails[];

  constructor(
    private auth: AuthenticationService
  ) { }

  // On init will need to grab the user collection from the db
  ngOnInit(): void {
    console.log("Trying to get user collection");

    // Grabs the users
    this.auth.getUserCollection().subscribe(data => {
      let validUsers: UserDetails[] = [];
      let pendUsers: UserDetails[] = [];
      let count = 1;

      // Sort users from valid to invalid suers
      data.forEach(element => {
        let user: UserDetails = element;

        if (user.validUser === false) {
          user.position = count++;
          pendUsers.push(user);
        } else {
          validUsers.push(user);
        }
      });

      // Set data
      this.users = validUsers;
      this.pUsers = pendUsers;

      // Test prints
      console.log(this.users);
      console.log(this.pUsers);
    },
      (err) => {
        console.error(err);
      });
  }

  // Selection variables
  pendingUsers = new MatTableDataSource<UserDetails>(this.pUsers);
  selection = new SelectionModel<UserDetails>(true, []);

  // Column headers
  validUsersColumns = ['firstName', 'lastName', 'userName', 'userRole'];
  pendingUsersColumns = ['select', 'firstName', 'lastName', 'userName'];

  // Whether is expanded or not
  expandedElement: UserDetails | null;

  // Whether the number of selected elements matches the total number of rows. 
  isAllSelected() {
    this.pendingUsers = new MatTableDataSource<UserDetails>(this.pUsers);
    let numSelected;
    let numRows;

    // Catch undefined errors
    if (this.pendingUsers.data.length && this.pendingUsers.data.length != undefined && this.pendingUsers.data.length != null) {
      numRows = this.pendingUsers.data.length;
    }
    else {
      numRows = 0;
    }
    if (this.selection.selected.length && this.selection.selected.length != undefined && this.selection.selected.length != null) {
      numSelected = this.pUsers.length;
    }
    else {
      numSelected = 0;
    }

    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.pUsers.forEach(row => this.selection.select(row));
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: UserDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // Delete pending users from validation table
async deletePendingUsers() {
    console.log("Deleting selected pending users");

    // Deleting
    for (const elem of this.selection.selected) {
      await this.deleteinvalid(elem);
    }
    window.location.reload();

  }

  // Validatie pending users from validation table
  async validatePendingUsers() {
    console.log("Validating selected pending users");

    // Updating
    for (const elem of this.selection.selected) {
      await this.updateToValid(elem);
    }
    window.location.reload();
  }

  // Updating to db wiht promise
  updateToValid(user : UserDetails) {
    return new Promise((resolve) => {
      setTimeout(() => {

        // Update in backend
        user.validUser = true;
        this.auth.updateUser(user).subscribe(() => { },
          (err) => {
            console.error(err);
          });

        resolve('done');
      }, 1000);
    })
  }

  // Deleting from db with promise
  deleteinvalid(user : UserDetails) {
    return new Promise((resolve) => {
      setTimeout(() => {

        // Update in backend
        this.auth.deleteUser(user).subscribe(() => { },
          (err) => {
            console.error(err);
          });

        resolve('done');
      }, 1000);
    })
  }
}