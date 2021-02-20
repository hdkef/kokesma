import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TomasComponent } from './tomas.component';
import { ItemComponent } from './item/item.component';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [TomasComponent, ItemComponent, LoadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:TomasComponent}
    ])
  ]
})
export class TomasModule { }
