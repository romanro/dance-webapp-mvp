import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarContentPageComponent, StarsPageComponent } from '.';


const routes: Routes = [
  { path: '', component: StarsPageComponent },
  { path: ':slug', component: StarContentPageComponent }
  /* {
    path: ':starId', component: StarInfoPageComponent,
    children: [
      { path: 'figures', component: StarContentListComponent, pathMatch: 'full' },
      { path: 'figures/test', component: StarFigureContentComponent,  pathMatch: 'full' },

    ]
  }, */
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentStarRoutingModule { }
