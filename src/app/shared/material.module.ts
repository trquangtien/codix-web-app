import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [],
    imports: [
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule
    ],
    exports: [
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule
    ],
})
export class MaterialModule {}
