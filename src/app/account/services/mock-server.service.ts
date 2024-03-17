import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as uuid from 'uuid';
import HttpResponseHandler from './http-response.utils';

export const usersKey = 'userCollection';

@Injectable({
    providedIn: 'root',
})
export class MockServerService {
    get users(): User[] {
        return JSON.parse(localStorage.getItem(usersKey)!) || [];
    }

    login(body: { username: string; password: string }) {
        const { username, password } = body;
        const user = this.users.find(
            (user) => user.username === username && user.password === password
        );

        if (!user) {
            return HttpResponseHandler.error('Username or password is incorrect');
        }

        return HttpResponseHandler.ok(user);
    }

    register(body: User) {
        const user = body;
        let users = this.users;

        if (
            this.users.find(
                (x) => x.username === user.username || x.email === user.email
            )
        ) {
            return HttpResponseHandler.error('Nickname or Email is already taken');
        }

        user.id = uuid.v4();
        users.push(new User(user));
        localStorage.setItem(usersKey, JSON.stringify(users));
        return HttpResponseHandler.ok(user);
    }

    updateUser(body: User, userId: string) {
        let updatedUser = null;
        const newUsers = this.users.map((user) => {
            if (user.id === userId) {
                const toUpdateUser = {
                    ...user,
                    username: body.username,
                    email: body.email,
                    phone: body.phone,
                    country: body.country,
                };

                if (body.password) {
                    toUpdateUser.password = body.password;
                }

                updatedUser = toUpdateUser;

                return toUpdateUser;
            }

            return user;
        });

        localStorage.setItem(usersKey, JSON.stringify(newUsers));
        return HttpResponseHandler.ok(updatedUser);
    }
}
