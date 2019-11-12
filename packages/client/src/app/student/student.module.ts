import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import {
  LabPageComponent,
  PracticesPageComponent,
  StarInfoPageComponent,
  StarsPageComponent,
  StudentLayoutComponent,
} from '.';
import { StudentProfileModule } from './profile-pages/student-profile.module';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule, NgbModule, StudentRoutingModule, InfraModule, StudentProfileModule
  ],
  declarations: [
    StudentLayoutComponent,
    StarsPageComponent,
    LabPageComponent,
    PracticesPageComponent,
    StarInfoPageComponent
  ],
})
export class StudentModule { }
