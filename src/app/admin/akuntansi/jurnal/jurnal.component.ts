import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../redux/reducer/app-reducer'
import * as fromAccActions from '../../../redux/actions/acc-actions'
import { Acc } from 'src/app/model/acc';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jurnal',
  templateUrl: './jurnal.component.html',
  styleUrls: ['./jurnal.component.css']
})
export class JurnalComponent implements OnInit,OnDestroy {

  FDate:string
  SDate:string
  accjurnal:Acc[]
  info:string = "status info"
  subs1:Subscription
  subs2:Subscription

  constructor(private store:Store<fromAppReducer.AppState>,private route:ActivatedRoute) { }
  ngOnDestroy(): void {
    if (this.subs1){this.subs1.unsubscribe()}
    if(this.subs2){this.subs2.unsubscribe()}
    this.store.dispatch(new fromAccActions.AccDestroyInfo())
  }

  ngOnInit(): void {
    this.subs1 = this.route.queryParams.subscribe((q)=>{
      this.FDate = q["FDate"]
      this.SDate = q["SDate"]
      this.store.dispatch(new fromAccActions.AccJournalStart({FDate:this.FDate,SDate:this.SDate}))
    })
    this.subs2 = this.store.select("acc").subscribe((a)=>{
      this.accjurnal = a["acc_journal"]
      if(a["info"] != "null"){
        this.info = a["info"]
      }
    })
  }

}
