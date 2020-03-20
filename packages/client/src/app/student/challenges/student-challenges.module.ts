import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@app/_infra/infra.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ChallengesPageComponent } from '.';
import { StudentChallengesRoutingModule } from './student-challenges-routing.module';

@NgModule({
  imports: [
    CommonModule, TranslateModule, NgbModule, InfraModule, StudentChallengesRoutingModule
  ],
  declarations: [ChallengesPageComponent]
})
export class StudentChallengesModule { }
