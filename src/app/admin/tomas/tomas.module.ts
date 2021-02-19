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
      {path:'',component:TomasComponent}
    ])
  ]
})
export class TomasModule { }
