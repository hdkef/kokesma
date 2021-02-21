import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tomas } from 'src/app/model/tomas';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../redux/actions/tomas-actions'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tomas',
  templateUrl: './tomas.component.html',
  styleUrls: ['./tomas.component.css']
})
export class TomasComponent implements OnInit, OnDestroy {

  Nama:string
  Rumah:string
  Checkout:Tomas[] = []
  Curstock:Tomas[] = []
  subs1:Subscription
  subs2:Subscription
  tablecheckout:boolean = false
  info:string = "status info"
  load:boolean

  constructor(private store:Store<fromAppReducer.AppState>) {}
  ngOnDestroy(): void {
    if (this.subs1){this.subs1.unsubscribe()}
    if (this.subs2){this.subs2.unsubscribe()}
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.subs1 = this.store.select("tomas").subscribe(x=>{
        this.load = x["load"]
        this.Curstock = x["curstocklist"]
        if (x["info"] !== "null"){
          this.info = x["info"]
          this.tablecheckout = null
        }
      })
    this.subs2 = this.store.select("auth").subscribe(x=>{
      this.Rumah = x["rumah"]
    })
    this.store.dispatch(new fromTomasActions.TomasMemInitCurstock)
  }

  pushToCheckout(newitem){
    let parsedJSON:Tomas = JSON.parse(newitem)
    this.tablecheckout = true
    this.Checkout.push(parsedJSON)
  }

  delete(index){
    this.Checkout.splice(index,1)
  }

  checkout(){
    let removedUnused = this.Checkout.map((x)=>{return {ItemID:x.ItemID,Qty:x.Qty}})
    let jsonData = JSON.stringify({House:this.Rumah,Items:removedUnused})
    if (this.Checkout.length == 0){
      alert("maaf sahabat, tidak bisa beli barang kosong")
      return
    }
    this.store.dispatch(new fromTomasActions.TomasAddMemTomas(jsonData))
  }

}
