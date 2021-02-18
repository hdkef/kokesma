import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../redux/actions/tomas-actions'
import { Store } from '@ngrx/store';
import { Tomas } from 'src/app/model/tomas';
import { Subscription } from 'rxjs';
import * as fromAuthActions from '../../redux/actions/auth-actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  Nama:string
  NIM:any
  Rumah:string
  Checkout:Tomas[]
  Curstock:Tomas[]
  Journal:Tomas[]
  showJ:boolean = false
  showT:boolean = false
  tablecheckout:boolean = false
  info:string = "status info"
  subs1:Subscription
  subs2:Subscription
  subs3:Subscription

  constructor(private store:Store<fromAppReducer.AppState>) { }
  ngOnDestroy(): void {
    this.subs1.unsubscribe()
    this.subs2.unsubscribe()
    this.subs3.unsubscribe()
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.Checkout = []
    this.store.dispatch(new fromTomasActions.TomasMemInit())
    this.subs1 = this.store.select("tomas").subscribe(x=>{
      this.Curstock = x["curstocklist"]
      this.Journal = x["journal"]
    })
    this.subs2 = this.store.select("tomas").subscribe(x=>{
      if (x["info"] !== "null"){
        this.info = x["info"]
        this.tablecheckout = null
        this.showJ = false
      }
    })
    this.subs3 = this.store.select("auth").subscribe((x)=>{
      this.Nama = x["nama"]
      this.Rumah = x["rumah"]
      this.NIM = x["nim"]
    })
  }

  logout(){
    this.store.dispatch(new fromAuthActions.LogoutStart())
  }

  showJurnal(){
    if (this.showJ){
      this.showJ = false
      this.showT = false
    }
    else{this.showJ = true;this.showT = false}
  }

  showAdd(){
    if (this.showT){
      this.showT = false
      this.showJ = false
    }
    else{this.showT = true;this.showJ = false}
  }

  pushToCheckout(newitem){
    let parsedJSON:Tomas = JSON.parse(newitem)
    this.tablecheckout = true
    this.Checkout.push(parsedJSON)
  }

  checkout(){
    let removedUnused = this.Checkout.map((x)=>{return {ItemID:x.ItemID,Qty:x.Qty}})
    let jsonData = JSON.stringify({House:this.Rumah,Items:removedUnused})
    this.store.dispatch(new fromTomasActions.TomasAddMemTomas(jsonData))
  }

  delete(index){
    this.Checkout.splice(index,1)
  }

}
