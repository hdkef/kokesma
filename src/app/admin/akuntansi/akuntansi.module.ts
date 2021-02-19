import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JurnalComponent } from './jurnal/jurnal.component';
import { LoadComponent } from './load/load.component';



@NgModule({
  declarations: [DashboardComponent, JurnalComponent, LoadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:DashboardComponent},
      {path:'journal',component:JurnalComponent}
    ]
    )
  ]
})
export class AkuntansiModule { }
