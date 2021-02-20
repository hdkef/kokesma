import { Component, OnInit } from '@angular/core';
import { Tomas } from 'src/app/model/tomas';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../redux/actions/tomas-actions'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-jurnal',
  templateUrl: './jurnal.component.html',
  styleUrls: ['./jurnal.component.css']
})
export class JurnalComponent implements OnInit, OnDestroy {


  constructor(private store:Store<fromAppReducer.AppState>) { }

  journal:Tomas[]
  load:boolean
  info:string = "status info"
  subs:Subscription

  ngOnDestroy(): void {
    if (this.subs){
      this.subs.unsubscribe()
    }
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.subs = this.store.select("tomas").subscribe(x=>{
      this.load = x["load"]
      if (x["info"] != "null"){
        this.info = x["info"]
      }
      this.journal = x["journal"]
    })
    this.store.dispatch(new fromTomasActions.TomasMemInitJournal())
  }

}
