import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../redux/reducer/app-reducer'
import * as fromAccActions from '../../../redux/actions/acc-actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  formAcc:FormGroup
  info:string = "status info"
  subs1:Subscription

  constructor(private store:Store<fromAppReducer.AppState>) { }
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
    this.subs1 = this.store.select("acc").subscribe((x)=>{
      console.log("infofff",x["info"])
      if (x['info'] !== 'null'){
        this.info = x["info"]
      }
    })
  }

  submit(){
    this.store.dispatch(new fromAccActions.AccInsert({subject:this.formAcc.value.Subject,debit:this.formAcc.value.Debit,kredit:this.formAcc.value.Kredit,ket:this.formAcc.value.Ket}))
  }

}
