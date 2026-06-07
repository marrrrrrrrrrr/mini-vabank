import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  errorMessage = '';

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
  });

  c(name: string) {
    return this.form.get(name)!;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe((user) => {
      if (user) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'არასწორი მომხმარებელი ან პაროლი';
      }
    });
  }
}