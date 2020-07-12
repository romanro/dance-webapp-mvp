import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarInfoPageComponent, StarsPageComponent, StarFigureContentComponent, StarContentListComponent } from '.';


const routes: Routes = [
  { path: '', component: StarsPageComponent },
  {
    path: ':starId', component: StarInfoPageComponent,
    children: [
      { path: 'figures', component: StarContentListComponent, pathMatch: 'full' },
      { path: 'figures/test', component: StarFigureContentComponent,  pathMatch: 'full' },

    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentStarRoutingModule { }
