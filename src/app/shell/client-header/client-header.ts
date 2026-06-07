import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Clients } from '../../shared/client';
import { Auth } from '../../auth/auth';
import { Accounts } from '../../shared/accounts';

@Component({
  selector: 'app-client-header',
  standalone: false,
  templateUrl: './client-header.html',
  styleUrl: './client-header.scss',
})
export class ClientHeader {
  private clients = inject(Clients);
  private auth = inject(Auth);
  private accounts = inject(Accounts);
  private router = inject(Router);

  client = this.clients.selected;

  assets = computed(() =>
    this.accounts.list().reduce((sum, a) => sum + Number(a.amount || 0), 0)
  );

  exitClient() {
    this.clients.setSelected(null);
    this.router.navigate(['/bpm/bpm000']);
  }
}