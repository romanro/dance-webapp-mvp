import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarDanceFiguresPageComponent, StarFigurePageComponent, StarInfoPageComponent, StarsPageComponent } from '.';


const routes: Routes = [
    { path: '', component: StarsPageComponent },
    { path: ':starId', component: StarInfoPageComponent },
    { path: ':starId/dance/:danceId', component: StarDanceFiguresPageComponent },
    { path: ':starId/dance/:danceId/figure/:figureId', component: StarFigurePageComponent }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentStarRoutingModule { }
