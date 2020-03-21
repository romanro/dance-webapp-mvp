import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChallengePageComponent, ChallengesPageComponent } from '.';


const routes: Routes = [
    { path: '', component: ChallengesPageComponent },
    { path: ':challengeId', component: ChallengePageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentChallengesRoutingModule { }
