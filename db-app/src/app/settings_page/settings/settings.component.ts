import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserDetails, AuthenticationService } from '../../authentication/authentication.service';

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

  constructor(
    private auth: AuthenticationService
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
  }

  // Column headers for valid users
  validUsersColumns = ['firstName', 'lastName', 'userName', 'userRole'];

  // Whether is expanded or not
  expandedElement: UserDetails | null;
}