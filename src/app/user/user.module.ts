import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './user-layout.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material.module';

@NgModule({
    declarations: [UserLayoutComponent, MyProfileComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
