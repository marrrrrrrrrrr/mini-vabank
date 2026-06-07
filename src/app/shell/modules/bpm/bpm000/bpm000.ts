import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Clients } from '../../../../shared/client';

@Component({
  selector: 'app-bpm000',
  standalone: false,
  templateUrl: './bpm000.html',
  styleUrl: './bpm000.scss',
})
export class Bpm000 {
  private fb = inject(FormBuilder);
  private clients = inject(Clients);
  private router = inject(Router);

  results = this.clients.results;

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    clientKey: [''],
  });

  search() {
  const firstName = this.form.controls.firstName.value ?? '';
  const lastName = this.form.controls.lastName.value ?? '';
  const clientKey = this.form.controls.clientKey.value ?? '';
  this.clients.search(firstName, lastName, clientKey).subscribe();
}

  openClient(id: string) {
    this.router.navigate(['/krn/krnicp'], { queryParams: { id } });
  }

  goToRegister() {
    this.router.navigate(['/bpm/bpm001']);
  }
}