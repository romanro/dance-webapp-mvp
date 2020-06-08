import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticesPageComponent, PracticePageComponent } from '.';


const routes: Routes = [
    { path: '', component: PracticesPageComponent },
    { path: ':practiceId', component: PracticePageComponent }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PracticesRoutingModule { }
