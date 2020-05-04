import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { Globals } from '../globals';

// Setting up data structures for communicating with backends schemas
export interface UserDetails {
  _id: string;
  userName: string;
  firstName: string,
  lastName: string,
  password: string,
  userRole: string,
  donorRegEditPriv: boolean,
  donorRegCreatePriv: boolean,
  donorRegDeletePriv: boolean,
  donorControlEditPriv: boolean,
  donorControlCreatePriv: boolean,
  donorControlDeletePriv: boolean,
  inventoryEditPriv: boolean,
  inventoryCreatePriv: boolean,
  inventoryDeletePriv: boolean,
  donorMetricEditPriv: boolean,
  donorMetricCreatePriv: boolean,
  donorMetricDeletePriv: boolean,
  position?: number,
  validUser: boolean,
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  userRole?: string;
  donorRegEditPriv?: boolean,
  donorRegCreatePriv?: boolean,
  donorRegDeletePriv?: boolean,
  donorControlEditPriv?: boolean,
  donorControlCreatePriv?: boolean,
  donorControlDeletePriv?: boolean,
  inventoryEditPriv?: boolean,
  inventoryCreatePriv?: boolean,
  inventoryDeletePriv?: boolean,
  donorMetricEditPriv?: boolean,
  donorMetricCreatePriv?: boolean,
  donorMetricDeletePriv?: boolean,
  validUser?: boolean,
  _id?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private globals: Globals
  ) { }

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
    //console.log(user);
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // Checks for proper privelges
  public hasPrivelges(url: string): boolean {
    console.log("checking privs for " + url);

    // Get user data
    const user = this.getUserDetails();

    // Check token's privelges for proper page
    switch (url) {
      case "/donor-table":
        return (user.donorRegCreatePriv || user.donorRegDeletePriv || user.donorRegEditPriv);
    }

    return true;
  }

  // Check for admin status
  public isAdmin(): boolean {
    const user = this.getUserDetails();
    if (user.userRole === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  // Sends the HTTP request to the database
  private request(method: 'put' | 'post' | 'get',
    type:
      'login' | 'changePassword' | 'register' |
      'nameCheck' | 'userCollection' | 'deleteUser'
      | 'updateUser',
    user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      console.log("Initializing 'post' request");
      base = this.http.post(this.globals.URL + `/api/${type}`, user);
    }

    else if (method === 'put') {
      console.log("Initializing 'put' request");
      base = this.http.put(this.globals.URL + `/api/${type}`, user);
    }

    else {
      console.log("Initializing 'get' request");

      // Come back and fix this to allow auth get request
      //base = this.http.get(this.globals.URL + `/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });

      // Unauth get request for user collection
      base = this.http.get(this.globals.URL + `/api/${type}`);
    }

    //const request = base.pipe(
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

  // Sends data to make new user
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  // Sends a request to validate login creditials
  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  // Sends a request to validate login creditials
  public changePassword(user: TokenPayload): Observable<any> {
    return this.request('put', 'changePassword', user);
  }

  // Send a request to check for unused username
  public isValidUsername(user: TokenPayload): Observable<any> {
    return this.request('post', 'nameCheck', user);
  }

  // Gets the user collection 
  public getUserCollection(): Observable<any> {
    return this.request('get', 'userCollection');
  }

  // Updates the user
  public updateUser(user: TokenPayload): Observable<any> {
    return this.request('put', 'updateUser', user);
  }

  // Delete the user 
  public deleteUser(user: TokenPayload): Observable<any> {
    return this.request('post', 'deleteUser', user);
  }

  // Deletes cookies and fowards user to login page
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('UT-BODY-FARM-TOKEN');
    this.router.navigateByUrl('/login');
  }
}
