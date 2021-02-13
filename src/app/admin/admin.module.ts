import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { TomasComponent } from './tomas/tomas.component';
import { AuthGuard } from './auth/auth-guard';
import { LoginToggle } from './auth/login-toggle';
import { MonitorComponent } from './monitor/monitor.component';



@NgModule({
  declarations: [DashboardComponent,LoginComponent, TomasComponent, MonitorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',redirectTo:'login'},
      {path:'login',component:LoginComponent, canActivate:[LoginToggle]},
      {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
      {path:'monitor/:rumah',component:MonitorComponent, canActivate:[AuthGuard]},
      {path:'tomas',component:TomasComponent, canActivate:[AuthGuard]}
    ])
  ],
  providers:[AuthGuard,LoginToggle]
})
export class AdminModule { }
