import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';

const userKey = 'loginUser';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private currentUser$: BehaviorSubject<User | null>;

    constructor(private http: HttpClient) {
        this.currentUser$ = new BehaviorSubject(
            JSON.parse(localStorage.getItem(userKey)!) || null
        );
    }

    get loginUser() {
        return this.currentUser$.value;
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(
            `${environment.apiUrl}/users/register`,
            user
        );
    }

    login(username: string, password: string): Observable<User> {
        return this.http
            .post<User>(`${environment.apiUrl}/users/login`, {
                username,
                password,
            })
            .pipe(
                map((user: User) => {
                    localStorage.setItem(userKey, JSON.stringify(user));
                    this.currentUser$.next(user);
                    return user;
                })
            );
    }

    updateUser(userId: string, user: User): Observable<User> {
        return this.http
            .put<User>(`${environment.apiUrl}/users/${userId}`, user)
            .pipe(
                map((user: User) => {
                    localStorage.setItem(userKey, JSON.stringify(user));
                    this.currentUser$.next(user);
                    return user;
                })
            );
    }

    logout(): Observable<boolean> {
        localStorage.removeItem(userKey);
        this.currentUser$.next(null);

        return of(true);
    }
}
