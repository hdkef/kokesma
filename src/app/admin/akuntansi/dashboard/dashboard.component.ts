import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../redux/reducer/app-reducer'
import * as fromAccActions from '../../../redux/actions/acc-actions'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  formAcc:FormGroup
  formJurnal:FormGroup
  info:string = "status info"
  subs1:Subscription
  show1:boolean = false
  show2:boolean = false
  load:boolean

  constructor(private store:Store<fromAppReducer.AppState>, private router:Router) { }
  ngOnDestroy(): void {
    if (this.subs1){
      this.subs1.unsubscribe()
    }
    this.store.dispatch(new fromAccActions.AccDestroyInfo())
  }

  ngOnInit(): void {
    this.formAcc = new FormGroup({
      'Subject':new FormControl(null,Validators.required),
      'Kredit':new FormControl(null,Validators.required),
      'Debit':new FormControl(null,Validators.required),
      'Ket':new FormControl(null,Validators.required)
    })
    this.formJurnal = new FormGroup({
      'FDate':new FormControl(null,Validators.required),
      'SDate':new FormControl(null,Validators.required)
    })
    this.subs1 = this.store.select("acc").subscribe((x)=>{
      this.load = x["load"]
      if (x['info'] !== 'null'){
        this.info = x["info"]
      }
    })
  }

  submit(){
    this.store.dispatch(new fromAccActions.AccInsert({subject:this.formAcc.value.Subject,debit:this.formAcc.value.Debit,kredit:this.formAcc.value.Kredit,ket:this.formAcc.value.Ket}))
  }

  showOne(){
    if(this.show1){
      this.show1 = false
      this.show2 = false
    }
    else{this.show1 = true;this.show2 = false}
  }

  showTwo(){
    if(this.show2){
      this.show2 = false
      this.show1 = false
    }
    else{this.show2 = true;this.show1 = false}
  }

  goJurnal(){
    let fdate = new Date(this.formJurnal.value.FDate).toISOString().split('T')[0]
    let sdate = new Date(this.formJurnal.value.SDate).toISOString().split('T')[0]
    this.router.navigate(["/admin/acc/journal"],{queryParams:{FDate:fdate,SDate:sdate}})
  }

}
