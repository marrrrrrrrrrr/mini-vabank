import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { KrnRoutingModule } from './krn-routing-module';
import { Krnicp } from './krnicp/krnicp';
import { AccountsPage } from './accounts/accounts';
import { CreateAccount } from './accounts/create-account/create-account';
import { Operations } from './operations/operations';


@NgModule({
  declarations: [
    Krnicp,
    AccountsPage,
    CreateAccount,
    Operations
  ],
  imports: [
    CommonModule,
    KrnRoutingModule,
    ReactiveFormsModule
  ]
})
export class KrnModule { }
