import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/services/account.service';
import { Router } from '@angular/router';
import { NotificationService } from './shared/services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    constructor(
        public accountService: AccountService,
        private router: Router,
        private notification: NotificationService
    ) {}

    ngOnInit(): void {}

    logout() {
        this.accountService.logout().subscribe((done) => {
            if (done) {
                this.router.navigateByUrl('/account/login');
                this.notification.show('Logout successful');
            }
        });
    }
}
