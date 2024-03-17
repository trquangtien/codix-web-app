import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/account/services/account.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { NotificationService } from '@app/shared/services/notification.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent extends BaseComponent implements OnInit {
    form!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private notification: NotificationService
    ) {
        super();
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }

    submit() {
        if (this.form.valid) {
            const { username, password } = this.form.value;

            this.accountService
                .login(username, password)
                .pipe(takeUntil(this.destroyed$))
                .subscribe({
                    next: (res) => {
                        this.notification.show('Login successful');
                        const returnUrl =
                            this.activatedRoute.snapshot.queryParams[
                                'returnUrl'
                            ] || '/';

                        this.router.navigateByUrl(returnUrl);
                    },
                    error: (err) => {
                        console.error(`Login error:`, err.error.message);
                        this.notification.show(err.error.message);
                    },
                });
        }
    }
}
