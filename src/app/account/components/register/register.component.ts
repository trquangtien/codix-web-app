import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '@app/account/services/account.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { COUNTRIES } from '@app/shared/constants/countries.constant';
import { NotificationService } from '@app/shared/services/notification.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
})
export class RegisterComponent extends BaseComponent implements OnInit {
    form!: FormGroup;

    readonly countries = COUNTRIES;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        private notificationService: NotificationService
    ) {
        super();
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group(
            {
                username: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
                confirmPassword: new FormControl('', Validators.required),
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                phone: new FormControl('', [
                    Validators.required,
                    Validators.pattern('[- +()0-9]{6,}'),
                ]),
                country: new FormControl('', Validators.required),
            },
            { validators: this.checkPasswords }
        );
    }

    submit() {
        if (this.form.valid) {
            this.accountService
                .register(this.form.value)
                .pipe(takeUntil(this.destroyed$))
                .subscribe({
                    next: (res) => {
                        this.notificationService.show(
                            'Register success'
                        );
                        this.router.navigateByUrl('/account/login');
                    },
                    error: (err) => {
                        console.error(`Register error:`, err.error.message);
                        this.notificationService.show(
                            err.error.message
                        );
                    },
                });
        }
    }

    private checkPasswords(form: FormGroup) {
        let pass = form.get('password')?.value;
        let confirmPass = form.get('confirmPassword')?.value;

        return pass === confirmPass ? null : { notSame: true };
    }
}
