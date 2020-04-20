import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

// Setting up data structures for communicating with backends schemas
export interface UserDetails {
  _id: string;
  userName: string;
  firstName: string,
  lastName: string,
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  userName: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userRole?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  // Saving JWT to browser
  private saveToken(token: string): void {
    localStorage.setItem('UT-BODY-FARM-TOKEN', token);
    this.token = token;
  }

  // Getting JWT from browser
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('UT-BODY-FARM-TOKEN');
    }
    return this.token;
  }

  // Unload the JWT
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  // Check for login status
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;
    let userUrl = 'http://localhost:8080';

    // THIS IS NEEDED WHEN BEING PUSHED TO PRODUCTION (AKA MASTER)
    //private userUrl = '/api/users';

    if (method === 'post') {
      //base = this.http.post(`/api/${type}`, user);
      base = this.http.post(userUrl + `/api/${type}`, user);
    } else {
      //base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      base = this.http.get(userUrl + `/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }


  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('UT-BODY-FARM-TOKEN');
    this.router.navigateByUrl('/login');
  }
}
