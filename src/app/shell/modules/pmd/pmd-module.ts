import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PmdRoutingModule } from './pmd-routing-module';
import { Pmd311 } from './pmd311/pmd311';


@NgModule({
  declarations: [
    Pmd311
  ],
  imports: [
    CommonModule,
    PmdRoutingModule,
    ReactiveFormsModule
  ]
})
export class PmdModule { }
