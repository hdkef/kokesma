import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromAuthActions from '../../redux/actions/auth-actions'
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup
  subs:Subscription
  info:string = 'status info'
  subs2:Subscription

  constructor(private store:Store<fromAppReducer.AppState>,private router:Router) { }
  ngOnDestroy(): void {
    if(this.subs != null){
      this.subs.unsubscribe()
    }
    this.subs2.unsubscribe()
    this.store.dispatch(new fromAuthActions.DeleteInfo())
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'NIM':new FormControl(null,Validators.required),
      'Pass':new FormControl(null,Validators.required),
      'Role':new FormControl(null,Validators.required)
    })
    this.subs2 = this.store.select("auth").subscribe((x)=>{
      if (x["info"] !== "null"){
        this.info = 'null'
      }
    })
  }

  login(){
    let NIM = this.loginForm.value.NIM
    let Password = this.loginForm.value.Pass
    let Role = this.loginForm.value.Role
    this.store.dispatch(new fromAuthActions.LoginStart({nim:NIM,password:Password,role:Role}))
    this.subs = this.store.select("auth").subscribe(x=>{
      if(x.token){
        this.router.navigateByUrl("/admin/dashboard")
      }
    })
  }

}
