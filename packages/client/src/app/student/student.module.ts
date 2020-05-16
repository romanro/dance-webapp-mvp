import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { PracticesPageComponent, StudentLayoutComponent } from '.';
import { StudentProfileModule } from './profile-pages/student-profile.module';
import { StudentRoutingModule } from './student-routing.module';
import { PracticePageComponent } from './practices/practice-page/practice-page.component';



@NgModule({
  imports: [
    CommonModule, TranslateModule, NgbModule, StudentRoutingModule, InfraModule, StudentProfileModule, FormsModule
  ],
  declarations: [
    StudentLayoutComponent,
    PracticesPageComponent,
    PracticePageComponent,
  ],
})
export class StudentModule { }
