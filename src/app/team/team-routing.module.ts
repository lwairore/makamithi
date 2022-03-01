import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamMainComponent } from './team-main/team-main.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '1',
  },
  {
    path: ':pageNumber',
    component: TeamMainComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
