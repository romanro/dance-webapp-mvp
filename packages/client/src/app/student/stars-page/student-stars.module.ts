import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { StarContentFiguresTabsListComponent, StarContentListComponent, StarInfoPageComponent, StarsPageComponent } from '.';
import { StudentStarRoutingModule } from './student-strars-routing.module';


@NgModule({
  imports: [
    CommonModule, TranslateModule, NgbModule, StudentStarRoutingModule, InfraModule
  ],
  declarations: [
    StarInfoPageComponent,
    StarsPageComponent,
    StarContentListComponent,
    StarContentFiguresTabsListComponent
  ]
})
export class StudentStarsModule { }
