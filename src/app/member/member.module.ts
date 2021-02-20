import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { LoginToggle } from './auth/login-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { LoadComponent } from './load/load.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, DashboardComponent, LoadComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'',redirectTo:'login'},
      {path:'login',component:LoginComponent,canActivate:[LoginToggle]},
      {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
      {path:'tomas',loadChildren:()=>{return import('./tomas/tomas.module').then(m=>{return m.TomasModule})},canActivate:[AuthGuard]},
      {path:'jurnal',loadChildren:()=>{return import('./jurnal/jurnal.module').then(m=>{return m.JurnalModule})},canActivate:[AuthGuard]},
      {path:'register',component:RegisterComponent}
    ]),
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers:[AuthGuard,LoginToggle]
})
export class MemberModule { }
