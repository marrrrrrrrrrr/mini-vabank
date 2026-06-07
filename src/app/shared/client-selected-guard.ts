import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Clients } from './client';

export const clientSelectedGuard: CanActivateFn = () => {
  const clients = inject(Clients);
  const router = inject(Router);

  if (clients.selected()) return true;

  router.navigate(['/bpm/bpm000']);
  return false;
};