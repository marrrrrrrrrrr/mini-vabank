import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Krnicp} from './krnicp/krnicp';
import {AccountsPage} from './accounts/accounts';
import {CreateAccount} from './accounts/create-account/create-account';
import {clientSelectedGuard} from '../../../shared/client-selected-guard';
import {Operations} from './operations/operations';

const routes: Routes = [
  { path: 'krnicp', component: Krnicp },
  { path: 'accounts', component: AccountsPage, canActivate: [clientSelectedGuard] },
  { path: 'accounts/create', component: CreateAccount, canActivate: [clientSelectedGuard] },
  { path: 'operations', component: Operations, canActivate: [clientSelectedGuard] },
  { path: '', redirectTo: 'krnicp', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KrnRoutingModule {}