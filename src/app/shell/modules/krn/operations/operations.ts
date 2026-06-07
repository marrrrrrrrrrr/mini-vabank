import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations',
  standalone: false,
  templateUrl: './operations.html',
  styleUrl: './operations.scss',
})
export class Operations {
  private router = inject(Router);

  goToTransfer() {
    this.router.navigate(['/pmd/pmd311']);
  }
}