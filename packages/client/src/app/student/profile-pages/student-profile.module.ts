import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { StudentEditProfilePageComponent, StudentProfilePageComponent, StudentUpicComponent } from '.';
import { StudentProfileRoutingModule } from './student-profile-routing.module';

@NgModule({
  imports: [

    CommonModule, FormsModule,
    ReactiveFormsModule, TranslateModule, StudentProfileRoutingModule, InfraModule, NgbModule
  ],
  declarations: [StudentProfilePageComponent, StudentEditProfilePageComponent, StudentUpicComponent]
})
export class StudentProfileModule { }
