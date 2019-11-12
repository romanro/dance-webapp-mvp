import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { StudentEditProfilePageComponent, StudentProfilePageComponent } from '.';

const routes: Routes = [
  { path: '', component: StudentProfilePageComponent },
  { path: 'edit', component: StudentEditProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class StudentProfileRoutingModule { }
