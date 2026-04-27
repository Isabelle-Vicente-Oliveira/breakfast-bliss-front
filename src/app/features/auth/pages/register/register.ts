import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { CreateDtoUser } from '../../../../core/interfaces/user.interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastService = inject(ToastService)


  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });



  register() {
    if (this.registerForm.invalid) return;
    const credentials = this.registerForm.getRawValue() as CreateDtoUser;

    this.userService.createUser(credentials).subscribe({
      next: (response) => {
        this.toastService.show('Cadastro  realizado com sucesso!', 'success');

        this.router.navigate(['/login']);

      },
      error: (err) => {
        console.error('Erro no login:', err);

        this.toastService.show('Erro ao realizar cadastro!', 'error');

      }
    });
  }
}
