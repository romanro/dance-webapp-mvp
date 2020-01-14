import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import {
  PracticesPageComponent,
  StarClassesComponent,
  StarInfoPageComponent,
  StarSkillsComponent,
  StarSkillViewComponent,
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
    PracticesPageComponent,
    StarInfoPageComponent,
    StarClassesComponent,
    StarSkillsComponent,
    StarSkillViewComponent
  ],
})
export class StudentModule { }
