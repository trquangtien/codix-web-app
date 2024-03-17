import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

const routes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children: [{ path: 'my-profile', component: MyProfileComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
