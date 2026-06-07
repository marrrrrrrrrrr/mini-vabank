import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShellRoutingModule } from './shell-routing-module';
import { Shell } from './shell';
import { ShellHeader } from './shell-header/shell-header';
import { ShellSidebar } from './shell-sidebar/shell-sidebar';
import { ClientHeader } from './client-header/client-header';

@NgModule({
  declarations: [
    Shell,
    ShellHeader,
    ShellSidebar,
    ClientHeader
  ],
  imports: [
    CommonModule,
    ShellRoutingModule
  ]
})
export class ShellModule { }