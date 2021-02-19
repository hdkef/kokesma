import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { LoginToggle } from './auth/login-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadComponent } from './load/load.component';


@NgModule({
  declarations: [DashboardComponent,LoginComponent, LoadComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',redirectTo:'login'},
      {path:'login',component:LoginComponent, canActivate:[LoginToggle]},
      {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
      {path:'monitor',loadChildren:()=>{
        return import('./monitor/monitor.module').then((m)=>{return m.MonitorModule})
      }, canActivate:[AuthGuard]},
      {path:'tomas',loadChildren:()=>{
        return import('./tomas/tomas.module').then((m)=>{return m.TomasModule})
      }, canActivate:[AuthGuard]},
      {path:'acc',loadChildren:()=>{
        return import('./akuntansi/akuntansi.module').then((m)=>{return m.AkuntansiModule})
      },canActivate:[AuthGuard]}
    ])
  ],
  providers:[AuthGuard,LoginToggle]
})
export class AdminModule { }
