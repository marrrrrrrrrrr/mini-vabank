import { Component, inject } from '@angular/core';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-shell-sidebar',
  standalone: false,
  templateUrl: './shell-sidebar.html',
  styleUrl: './shell-sidebar.scss',
})
export class ShellSidebar {
  private auth = inject(Auth);
  user = this.auth.user;
}