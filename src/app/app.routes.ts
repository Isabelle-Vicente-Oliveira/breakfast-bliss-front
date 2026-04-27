import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { authGuard } from './core/guards/auth.guard';
import { Register } from './features/auth/pages/register/register';
import { Home } from './features/home/home';
import { MenuItemForm } from './features/menu/pages/menu-item-form/menu-item-form';
import { MenuItemDetails } from './features/menu/pages/menu-item-details/menu-item-details';


export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'menu/new', component: MenuItemForm, canActivate: [authGuard] },
    { path: 'menu/edit/:id', component: MenuItemForm, canActivate: [authGuard] },
    { path: 'menu/detail/:id', component: MenuItemDetails, canActivate: [authGuard] },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];