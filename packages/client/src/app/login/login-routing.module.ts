import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { ForgotPasswordPageComponent, LoginLayoutComponent, LoginPageComponent, RegisterPageComponent } from '.';


const routes: Routes = [
  {
    path: '', component: LoginLayoutComponent, children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'forgot-password', component: ForgotPasswordPageComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
