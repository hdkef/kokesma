import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [MonitorComponent, LoadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:':rumah',component:MonitorComponent}
    ])
  ]
})
export class MonitorModule { }
