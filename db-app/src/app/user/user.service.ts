import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import {User} from './user.model';

/* General service class to GET, POST, DELETE, and UPDATE users */
@Injectable({providedIn: 'root'})
export class UserService {

    // THIS NEEDED DURING LOCAL PRODUCTION
    private userUrl = 'http://localhost:8080/api/users';

    // THIS IS NEEDED WHEN BEING PUSHED TO PRODUCTION (AKA MASTER)
    //private userUrl = '/api/users';
    
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    constructor(private http: HttpClient) {}

    /* Grabs the user collections */
    getUserCollection() {return this.http.get<{message: string, users: User[]}>(this.userUrl); }

    /* Returns observable of users */
    getUserUpdateListener() {return this.usersUpdated.asObservable(); }

    /* Adds a new user to database */
    addUser(user: User) {
        this.http.post<{message: string, userId: string}>(this.userUrl, user)
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
            this.http.delete(this.userUrl + users[i].id)
            .subscribe(() => {
                const updatedUsers = this.users.filter(user => user.id !== user[i].id );
                this.users = updatedUsers;
                this.usersUpdated.next([...this.users]);
            });
        }
    }

    /* Generates a JWT for user on login */
    generateJWT(user: User) {
        var jwt = require('jsonwebtoken');
        var expire = new Date();

        // Set how long for it to be valid
        expire.setDate(expire.getDate()+7);

        return jwt.sign({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            exp: (expire.getTime()/1000).toString(),

            // Need to change the 'Secret' to private key
        }, "SECRET");
    }

}