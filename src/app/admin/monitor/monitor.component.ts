import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../redux/actions/tomas-actions'
import { Tomas } from 'src/app/model/tomas';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit,OnDestroy {

  constructor(private route:ActivatedRoute, private store:Store<fromAppReducer.AppState>) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  Rumah:string
  monuser:string[]
  monjournal:Tomas[]
  monstock:Tomas[]
  moncurstock:Tomas[]
  sum:Number
  subs:Subscription

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.Rumah = x["rumah"]
      this.store.dispatch(new fromTomasActions.TomasAdmMonitor(this.Rumah))
    })
    this.subs = this.store.select("tomas").subscribe((x)=>{
      this.monuser = x["monuser"]
      this.monjournal = x["monjournal"]
      this.monstock = x["monstocklist"]
      this.moncurstock = x["moncurstock"]
      this.sum = x["sum"]
    })
  }

}
