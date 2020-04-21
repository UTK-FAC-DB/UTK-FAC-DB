import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {User} from './user.model';
import { Globals } from '../globals';

/* General service class to GET, POST, DELETE, and UPDATE users */
@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    constructor(
        private http: HttpClient,
        private globals: Globals
        ) {}

    /* Grabs the user collections */
    getUserCollection() {return this.http.get<{message: string, users: User[]}>(this.globals.URL+'/api/users'); }

    /* Returns observable of users */
    getUserUpdateListener() {return this.usersUpdated.asObservable(); }

    /* Adds a new user to database */
    addUser(user: User) {
        this.http.post<{message: string, userId: string}>(this.globals.URL, user)
        .subscribe(responseData => {
            console.log(responseData.message);
            console.log(responseData.userId);
            const id = responseData.userId;
            user.id = id;
            this.users.push(user);
            this.usersUpdated.next([...this.users]);
        });
    }

    /* Deletes a list of given users from database */
    deleteUser(users: User[]) {
        for (let i = 0; i < users.length; i++) {
            this.http.delete(this.globals.URL + users[i].id)
            .subscribe(() => {
                const updatedUsers = this.users.filter(user => user.id !== user[i].id );
                this.users = updatedUsers;
                this.usersUpdated.next([...this.users]);
            });
        }
    }

}