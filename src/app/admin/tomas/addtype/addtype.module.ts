import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddtypeComponent } from './addtype.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [AddtypeComponent, LoadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:AddtypeComponent}
    ])
  ]
})
export class AddtypeModule { }
