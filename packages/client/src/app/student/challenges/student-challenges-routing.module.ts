import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChallengesPageComponent } from '.';


const routes: Routes = [
    { path: '', component: ChallengesPageComponent },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentChallengesRoutingModule { }