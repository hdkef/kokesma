import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TomasComponent } from './tomas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [TomasComponent, LoadComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path:'',component:TomasComponent},
      {path:'input',loadChildren:()=>{
        return import('./input/input.module').then(m=>m.InputModule)
      }},
      {path:'addtype',loadChildren:()=>{
        return import('./addtype/addtype.module').then(m=>m.AddtypeModule)
      }},
    ])
  ]
})
export class TomasModule { }
