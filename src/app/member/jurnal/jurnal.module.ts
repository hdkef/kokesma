import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JurnalComponent } from './jurnal.component';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [JurnalComponent, LoadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:JurnalComponent}
    ])
  ]
})
export class JurnalModule { }
