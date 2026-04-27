import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('auth_token');
    if (token) {
        return true;
    } else {
        console.warn('Acesso negado. Redirecionando para login...');
        router.navigate(['/login']);
        return false;
    }
};