import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account-layout',
    templateUrl: './account-layout.component.html',
})
export class AccountLayoutComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.accountService.loginUser) {
            this.router.navigate(['/']);
        }
    }
}
