import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { RouterModule } from '@angular/router';
import { LoadComponent } from './load/load.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';



@NgModule({
  declarations: [InputComponent, LoadComponent, ItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:InputComponent}
    ])
  ]
})
export class InputModule { }
