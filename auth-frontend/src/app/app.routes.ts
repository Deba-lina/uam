import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Profile } from './components/profile/profile';
import { authGuard } from './gaurds/auth-guard';
import { UserManagement } from './components/user-management/user-management';
import { Users } from './components/users/users';
import { guestGuard } from './gaurds/guest-guard';
import { OemManagement } from './components/oem-management/oem-management';


export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: 'add-user', component: UserManagement, canActivate: [authGuard] },
    {
        path: 'login',
        component: Login,
        canActivate: [guestGuard]
    },
    {
        path: 'signup',
        component: Signup,
        canActivate: [guestGuard]
    },
    {
        path: 'users',
        component: Users,
        canActivate: [authGuard]
    },
    {
        path: 'oem-management',
        component: OemManagement,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' }
];
