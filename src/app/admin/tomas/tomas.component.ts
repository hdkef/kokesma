import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../redux/actions/tomas-actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tomas',
  templateUrl: './tomas.component.html',
  styleUrls: ['./tomas.component.css']
})
export class TomasComponent implements OnInit,OnDestroy {

  info:string = "status update"
  subs:Subscription
  load:boolean

  constructor(private store:Store<fromAppReducer.AppState>) { }
  ngOnDestroy(): void {
    if (this.subs){
      this.subs.unsubscribe()
    }
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.subs = this.store.select("tomas").subscribe(x=>{
      this.load = x["load"]
      if (x["info"] !== "null"){
        this.info = x["info"]
      }
    })

  }

  backupReset(){
    this.store.dispatch(new fromTomasActions.TomasAdmBackupReset())
  }

}
