import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BaseComponent } from './components/base/base.component';

@NgModule({
    declarations: [BaseComponent, HomeComponent, WelcomeComponent],
    imports: [CommonModule],
    exports: [BaseComponent, HomeComponent, WelcomeComponent],
})
export class SharedModule {}
