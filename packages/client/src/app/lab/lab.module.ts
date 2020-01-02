import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfraModule } from '@infra/infra.module';

import { LabPageComponent, LabVideoToolComponent } from '.';
import { LabRoutingModule } from './lab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LabRoutingModule,
    InfraModule
  ],
  declarations: [LabPageComponent, LabVideoToolComponent],
  exports: []
})
export class LabModule { }
