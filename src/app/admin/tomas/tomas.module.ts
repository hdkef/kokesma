import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TomasComponent } from './tomas.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TomasComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path:'',component:TomasComponent}
    ])
  ]
})
export class TomasModule { }
