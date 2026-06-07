import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BpmRoutingModule } from './bpm-routing-module';
import { Bpm000 } from './bpm000/bpm000';
import { Bpm001 } from './bpm001/bpm001';

@NgModule({
  declarations: [
    Bpm000, 
    Bpm001
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    BpmRoutingModule
  ],
})
export class BpmModule {}