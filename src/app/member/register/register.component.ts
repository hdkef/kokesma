import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromAuthActions from '../../redux/actions/auth-actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm:FormGroup
  NIM:FormControl
  info:string = "status info"
  subs:Subscription
  load:boolean

  constructor(private store:Store<fromAppReducer.AppState>) { }
  ngOnDestroy(): void {
    if (this.subs){
      this.subs.unsubscribe()
    }
    this.store.dispatch(new fromAuthActions.DeleteInfo())
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        'Rumah':new FormControl(null,Validators.required),
        'NIM':new FormControl(null,[Validators.required, Validators.pattern("^[0-9]{10,}$")]),
        'Nama':new FormControl(null,Validators.required),
        'Pass':new FormControl(null,Validators.required),
      }
    )
    this.subs = this.store.select("auth").subscribe((x)=>{
      this.load = x["load"]
      if (x["info"] !== "null"){
        this.info = x["info"]
      }
    })
  }

  register(){
    let rumah = this.registerForm.value.Rumah
    let nim = this.registerForm.value.NIM
    let nama = this.registerForm.value.Nama
    let pass = this.registerForm.value.Pass
    let role = "MEM"
    this.store.dispatch(new fromAuthActions.RegistStart({Rumah:rumah,Nama:nama,NIM:nim,Password:pass,Role:role}))
  }

}
