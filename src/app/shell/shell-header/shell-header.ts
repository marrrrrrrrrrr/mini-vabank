import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth/auth';
import { Clients } from '../../shared/client';

@Component({
  selector: 'app-shell-header',
  standalone: false,
  templateUrl: './shell-header.html',
  styleUrl: './shell-header.scss',
})
export class ShellHeader {
  private auth = inject(Auth);
  private clients = inject(Clients);
  private router = inject(Router);

  logout() {
    this.clients.setSelected(null);
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}