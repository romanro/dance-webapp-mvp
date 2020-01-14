import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarInfoPageComponent, StarsPageComponent } from '.';


const routes: Routes = [
    { path: '', component: StarsPageComponent },
    { path: ':id', component: StarInfoPageComponent },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentStarRoutingModule { }
