import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockServerInterceptor } from './account/services/mock-server.interceptor';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MockServerInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
