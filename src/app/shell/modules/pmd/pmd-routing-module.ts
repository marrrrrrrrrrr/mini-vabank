import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pmd311 } from './pmd311/pmd311';
import { clientSelectedGuard } from '../../../shared/client-selected-guard';

const routes: Routes = [
  { path: 'pmd311', component: Pmd311, canActivate: [clientSelectedGuard] },
  { path: '', redirectTo: 'pmd311', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmdRoutingModule {}