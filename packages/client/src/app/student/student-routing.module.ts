import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NotificationsPageComponent } from '@app/_infra/ui';

import { LabPageComponent, PracticesPageComponent, StarsPageComponent, StudentLayoutComponent } from '.';


const routes: Routes = [
  {
    path: '', component: StudentLayoutComponent, children: [
      { path: 'star', component: StarsPageComponent },
      { path: 'lab', component: LabPageComponent },
      { path: 'practices', component: PracticesPageComponent },
      { path: 'notifications', component: NotificationsPageComponent },
      { path: 'profile', loadChildren: () => import('./profile-pages/student-profile.module').then(m => m.StudentProfileModule) },
      { path: '', redirectTo: 'star', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
