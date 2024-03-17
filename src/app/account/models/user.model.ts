export class User {
    id?: string;
    username: string = '';
    password: string = '';
    email: string = '';
    phone: string = '';
    country: string = '';

    constructor(data?: Partial<User>) {
        if (!data) return;

        this.id = data.id ?? '';
        this.username = data.username ?? '';
        this.password = data.password ?? '';
        this.email = data.email ?? '';
        this.phone = data.phone ?? '';
        this.country = data.country ?? '';
    }
}
