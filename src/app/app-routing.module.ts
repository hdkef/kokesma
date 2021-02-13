import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:'',redirectTo:'landing-page',pathMatch:'full'},
  {path:'landing-page',component:LandingPageComponent},
  {path:'member',loadChildren:()=>{
    return import('./member/member.module').then(m=>{return m.MemberModule})}},
  {path:'admin',loadChildren:()=>{
    return import('./admin/admin.module').then(m=>m.AdminModule)
  }},
  {path:'error',component:ErrorComponent},
  {path:'**',redirectTo:'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
