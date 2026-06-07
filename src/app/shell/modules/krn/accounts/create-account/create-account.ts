import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from '../../../../../shared/accounts';
import { Clients } from '../../../../../shared/client';

@Component({
  selector: 'app-create-account',
  standalone: false,
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {
  private fb = inject(FormBuilder);
  private accounts = inject(Accounts);
  private clients = inject(Clients);
  private router = inject(Router);

  form = this.fb.group({
    accountName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    amount: ['', [Validators.min(0)]],

  });

  c(name: string) {
    return this.form.get(name)!;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const client = this.clients.selected();
    if (!client?.id) return;

    const v = this.form.value;
    this.accounts
      .create({
        clientId: client.id,
        ownerName: `${client.firstName} ${client.lastName}`,
        accountName: v.accountName!,
        amount: Number(v.amount) || 0,
      })
      .subscribe(() => this.router.navigate(['/krn/accounts']));
  }
}