import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // If not logged in, send to login page
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    // If user doesn't have priveleges, send to home page
    if(!this.auth.hasPrivelges(state.url)) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }

}
