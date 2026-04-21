import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import {
    Observable,
    tap
} from 'rxjs';
import { Router } from '@angular/router';
import { CreateDtoSession, Session } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private apiUrl = import.meta.env.VITE_BREAKFAST_API;

    currentUser = signal<User | null>(null);
    isAdmin = computed(() => this.currentUser()?.role === 'admin');



    createSession(credentials: CreateDtoSession): Observable<Session> {
        return this.http.post<Session>(`${this.apiUrl}/sessions`, credentials).pipe(
            tap(response => {
                localStorage.setItem('auth_token', response.token);
                this.currentUser.set(response.user);
            })
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

}