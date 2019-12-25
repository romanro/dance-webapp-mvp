import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LabPageComponent } from '.';
import { LabRoutingModule } from './lab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LabRoutingModule
  ],
  declarations: [LabPageComponent],
  exports: []
})
export class LabModule { }
