import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import {
  LevelsTabsComponent,
  StarContentPageComponent,
  StarContentTabsComponent,
  StarFigurePageComponent,
  StarsPageComponent,
} from '.';
import { StudentStarRoutingModule } from './student-strars-routing.module';


@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, TranslateModule.forChild(), NgbModule, StudentStarRoutingModule, InfraModule
  ],
  declarations: [
    StarsPageComponent, StarContentPageComponent, StarContentTabsComponent, LevelsTabsComponent, StarFigurePageComponent
  ]
})
export class StudentStarsModule { }
