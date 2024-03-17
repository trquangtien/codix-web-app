import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '@app/shared/material.module';
import { AccountLayoutComponent } from './account-layout.component';

@NgModule({
    declarations: [AccountLayoutComponent, LoginComponent, RegisterComponent],
    imports: [
        AccountRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountModule {}
