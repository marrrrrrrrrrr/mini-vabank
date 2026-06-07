import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clients } from '../../../../shared/client';

@Component({
  selector: 'app-bpm001',
  standalone: false,
  templateUrl: './bpm001.html',
  styleUrl: './bpm001.scss',
})
export class Bpm001 {
  private fb = inject(FormBuilder);
  private clients = inject(Clients);
  private router = inject(Router);

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    plusPoints: ['', [Validators.min(0)]],
  });

  c(name: string) {
    return this.form.get(name)!;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const newClient = {
      firstName: v.firstName!,
      lastName: v.lastName!,
      plusPoints: Number(v.plusPoints) || 0,
      clientKey: Math.floor(Math.random() * 90000) + 10000,
      photo: `https://ui-avatars.com/api/?name=${v.firstName}+${v.lastName}&background=random`,
      activities: 0,
    };

    this.clients.create(newClient).subscribe((created) => {
      this.router.navigate(['/krn/krnicp'], { queryParams: { id: created.id } });
    });
  }
}