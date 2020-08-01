import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { StarContentPageComponent, StarsPageComponent } from '.';
import { StudentStarRoutingModule } from './student-strars-routing.module';


@NgModule({
  imports: [
    CommonModule, TranslateModule.forChild(), NgbModule, StudentStarRoutingModule, InfraModule
  ],
  declarations: [
    StarsPageComponent, StarContentPageComponent
  ]
})
export class StudentStarsModule { }
