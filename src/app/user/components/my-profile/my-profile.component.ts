import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AccountService } from '@app/account/services/account.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { COUNTRIES } from '@app/shared/constants/countries.constant';
import { NotificationService } from '@app/shared/services/notification.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent extends BaseComponent implements OnInit {
    form!: FormGroup;

    readonly countries = COUNTRIES;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
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
                username: new FormControl(
                    this.accountService.loginUser?.username,
                    Validators.required
                ),
                email: new FormControl(this.accountService.loginUser?.email, [
                    Validators.required,
                    Validators.email,
                ]),
                password: new FormControl(''),
                confirmPassword: new FormControl(''),
                phone: new FormControl(
                    this.accountService.loginUser?.phone,
                    Validators.required
                ),
                country: new FormControl(
                    this.accountService.loginUser?.country,
                    Validators.required
                ),
            },
            { validators: this.checkPasswords }
        );
    }

    submit() {
        if (this.form.valid && this.accountService.loginUser?.id) {
            this.accountService
                .updateUser(this.accountService.loginUser.id, this.form.value)
                .pipe(takeUntil(this.destroyed$))
                .subscribe({
                    next: (res) => {
                        this.notificationService.show('Update success');
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
