import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClassSectionComponent } from './add-class-section/add-class-section.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddSectionComponent } from './add-section/add-section.component';


const routes: Routes = [
  {
    path: 'add-class',
    component: AddClassComponent
  },
  {
    path:'add-section',
    component: AddSectionComponent
  },
  {
    path:'add-class-section',
    component: AddClassSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { } 
