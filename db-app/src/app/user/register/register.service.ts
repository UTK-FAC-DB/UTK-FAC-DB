import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../user.model'

@Injectable({providedIn: 'root'})
export class RegisterService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    constructor(private http: HttpClient) {}

    /* Grabs all users from database */
    getUsers() {
        this.http.get<{message: string, users: any}>('http://localhost:8080/api/users')
        .pipe(map((userData) => {
            return userData.users.map(user => {
                return {
                    id: user._id,
                    lastName: user.lastName,
                    firstName: user.firstName,
                    password: user.password,
                    userName: user.userName
                };
            });
        }))
        .subscribe(transformedUsers => {
            this.users = transformedUsers;
            this.usersUpdated.next([...this.users]);
        });
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    /* Adds a new user to database */
    addUser(user: User) {
        this.http.post<{message: string, userId: string}>('http://localhost:8080/api/users', user)
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
            this.http.delete('http://localhost:8080/api/users' + users[i].id)
            .subscribe(() => {
                const updatedUsers = this.users.filter(user => user.id !== user[i].id );
                this.users = updatedUsers;
                this.usersUpdated.next([...this.users]);
            });
        }
    }
}