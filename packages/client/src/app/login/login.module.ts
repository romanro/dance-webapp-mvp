import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { LoginLayoutComponent, LoginPageComponent, RegisterPageComponent } from '.';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoginRoutingModule
  ],
  declarations: [LoginPageComponent, RegisterPageComponent, LoginLayoutComponent]
})
export class LoginModule { }
