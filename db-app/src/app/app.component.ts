import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'db-app';
  showHead: boolean = false;

  constructor(
    private router: Router,
    public auth: AuthenticationService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {

        if (event['url'] === '/login' || event['url'] === '/register') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });
  }
}
