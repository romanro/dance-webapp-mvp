import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { PracticesPageComponent, StudentLayoutComponent, PracticePageComponent } from '.';


const routes: Routes = [
  {
    path: '', component: StudentLayoutComponent, children: [
      { path: 'star', loadChildren: () => import('./stars-page/student-stars.module').then(m => m.StudentStarsModule) },
      { path: 'lab', loadChildren: () => import('../lab/lab.module').then(m => m.LabModule) },
      { path: 'practices', loadChildren: () => import('./practices/parctices.module').then(m => m.PracticesModule) },
      // { path: 'practices/:id', component: PracticePageComponent },

      { path: 'profile', loadChildren: () => import('./profile-pages/student-profile.module').then(m => m.StudentProfileModule) },
      { path: 'challenges', loadChildren: () => import('./challenges/student-challenges.module').then(m => m.StudentChallengesModule) },
      { path: '', redirectTo: 'star', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
