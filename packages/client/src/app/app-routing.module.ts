import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { PageNotFoundComponent } from '@infra/ui/';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
