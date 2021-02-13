import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TomasComponent } from './tomas/tomas.component';
import { AuthGuard } from './auth/auth-guard';
import { LoginToggle } from './auth/login-toggle';
import { JurnalComponent } from './jurnal/jurnal.component';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, DashboardComponent, TomasComponent, JurnalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',redirectTo:'login'},
      {path:'login',component:LoginComponent,canActivate:[LoginToggle]},
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
      {path:'register',component:RegisterComponent}
    ])
  ],
  providers:[AuthGuard,LoginToggle]
})
export class MemberModule { }