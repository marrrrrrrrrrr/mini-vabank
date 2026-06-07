import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  errorMessage = '';

  form = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    },
    { validators: passwordsMatch }
  );

  c(name: string) {
    return this.form.get(name)!;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, username, password } = this.form.value;
    this.auth.register({ name: name!, username: username!, password: password! }).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.errorMessage = 'რეგისტრაცია ვერ მოხერხდა, სცადეთ თავიდან'),
    });
  }
}