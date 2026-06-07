import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Accounts } from '../../../../shared/accounts';
import { Clients } from '../../../../shared/client';
import { API_URL } from '../../../../shared/api-constants';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pmd311',
  standalone: false,
  templateUrl: './pmd311.html',
  styleUrl: './pmd311.scss',
})
export class Pmd311 implements OnInit {
  private fb = inject(FormBuilder);
  private accounts = inject(Accounts);
  private clients = inject(Clients);
  private http = inject(HttpClient);
  private router = inject(Router);

  list = this.accounts.list;

  form = this.fb.group({
    senderAccountKey: ['', [Validators.required]],
    receiverAccountKey: ['', [Validators.required]],
    amount: ['', [Validators.min(0)]],
  });

  ngOnInit() {
    const c = this.clients.selected();
    if (c?.id) this.accounts.loadForClient(c.id).subscribe();
  }

  c(name: string) {
    return this.form.get(name)!;
  }
  save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const senderId = this.form.value.senderAccountKey!;
  const receiverId = this.form.value.receiverAccountKey!;
  const amount = Number(this.form.value.amount) || 0;

  if (senderId === receiverId) {
    alert('გამგზავნი და მიმღები ანგარიში ერთი და იგივეა');
    return;
  }

  const accounts = this.list();
  const sender = accounts.find((a) => a.id === senderId);
  const receiver = accounts.find((a) => a.id === receiverId);
  if (!sender || !receiver) return;

  if (Number(sender.amount) < amount) {
    alert('არასაკმარისი თანხა გამგზავნ ანგარიშზე');
    return;
  }

  const newSenderAmount = Number(sender.amount) - amount;
  const newReceiverAmount = Number(receiver.amount) + amount;

  forkJoin([
    this.accounts.updateAmount(senderId, newSenderAmount),
    this.accounts.updateAmount(receiverId, newReceiverAmount),
    this.http.post(`${API_URL}/bpm_operations.json`, {
      senderAccountKey: senderId,
      receiverAccountKey: receiverId,
      amount,
    }),
  ]).subscribe(() => {
    this.router.navigate(['/krn/accounts']);
  });
}
}