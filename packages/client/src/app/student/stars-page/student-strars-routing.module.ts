import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarInfoPageComponent, StarsPageComponent, StarContentFiguresTabsListComponent } from '.';


const routes: Routes = [
    { path: '', component: StarsPageComponent },
    { path: ':starId', component: StarInfoPageComponent,
    children: [
        {
          path: 'figures', // child route path
          component: StarContentFiguresTabsListComponent // child route component that the router renders
        },
   
      ] 
     }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentStarRoutingModule { }
