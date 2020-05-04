import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user = this.auth.getUserDetails();

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    console.log(this.user);
  }

  CheckboxReadOnly() {
    return false;
  }

}
