import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clients } from '../../../../shared/client';
import { Accounts } from '../../../../shared/accounts';

@Component({
  selector: 'app-krnicp',
  standalone: false,
  templateUrl: './krnicp.html',
  styleUrl: './krnicp.scss',
})
export class Krnicp implements OnInit {
  private route = inject(ActivatedRoute);
  private clients = inject(Clients);
  private accounts = inject(Accounts);

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.clients.loadOne(id).subscribe((client) => {
        if (client.id) this.accounts.loadForClient(client.id).subscribe();
      });
    } else {
      const current = this.clients.selected();
      if (current?.id) this.accounts.loadForClient(current.id).subscribe();
    }
  }
}