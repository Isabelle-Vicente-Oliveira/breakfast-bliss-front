import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/interfaces/user.interface';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { CreateDtoSession, Session } from '../../../../core/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService)
  currentUser = signal<User | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.loginForm.invalid) return;
    const credentials = this.loginForm.getRawValue() as CreateDtoSession;

    this.authService.createSession(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.token);
        this.currentUser.set(response.user);
        this.toastService.show('Login realizado com sucesso!', 'success');

        this.router.navigate(['/home']);

      },
      error: (err) => {
        console.error('Erro no login:', err);

        this.toastService.show('Erro ao realizar login!', 'error');

      }
    });
  }

}
