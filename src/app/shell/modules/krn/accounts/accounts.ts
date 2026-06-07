import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from '../../../../shared/accounts';
import { Clients } from '../../../../shared/client';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class AccountsPage implements OnInit {
  private accounts = inject(Accounts);
  private clients = inject(Clients);
  private router = inject(Router);

  list = this.accounts.list;
  client = this.clients.selected;

  ngOnInit() {
    this.reload();
  }

  reload() {
    const c = this.client();
    if (c?.id) this.accounts.loadForClient(c.id).subscribe();
  }

  goToCreate() {
    this.router.navigate(['/krn/accounts/create']);
  }

  deleteAccount(id: string, event: Event) {
    event.stopPropagation();
    this.accounts.remove(id).subscribe(() => this.reload());
  }
}