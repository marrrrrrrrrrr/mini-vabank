import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Bpm000 } from './bpm000/bpm000';
import { Bpm001 } from './bpm001/bpm001';

const routes: Routes = [
  { path: 'bpm000', component: Bpm000 },
  { path: 'bpm001', component: Bpm001 },
  { path: '', redirectTo: 'bpm000', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BpmRoutingModule {}