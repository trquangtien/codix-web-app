import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './account/services/auth.guard';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'account',
        loadChildren: () =>
            import('./account/account.module').then((m) => m.AccountModule),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
