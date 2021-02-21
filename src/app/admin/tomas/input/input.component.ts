import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tomas } from 'src/app/model/tomas';
import * as fromAppReducer from '../../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../../redux/actions/tomas-actions'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {

  Home:string[]
  ItemOptions:Tomas[]
  subs:Subscription
  load:boolean
  info:string = "status info"
  list:Tomas[] = []
  homeBatchForm:FormGroup
  showtable:boolean = false

  constructor(private store:Store<fromAppReducer.AppState>) { }

  ngOnDestroy(): void {
    if (this.subs){this.subs.unsubscribe()}
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.subs = this.store.select("tomas").subscribe((x)=>{
      this.load = x["load"]
      this.Home = x["admHome"]
      this.ItemOptions = x["admItemOptions"]
      if (x["info"] !== "null") {
        this.info = x["info"]
        this.showtable = null
      }
    })
    this.store.dispatch(new fromTomasActions.TomasAdmInit())
    this.homeBatchForm = new FormGroup({
      'Home':new FormControl(null,Validators.required),
      'Batch':new FormControl(null,Validators.required)
    })
  }

  pushToList(object){
    let jsonData:Tomas = JSON.parse(object)
    this.showtable = true
    this.list.push(jsonData)
  }

  delete(index){
    this.list.splice(index,1)
  }

  submitTomas(){
    if (this.list.length == 0 || !this.homeBatchForm.valid){
      alert("maaf sahabat, itemsnya kosong! atau rumah / batch belum diisi")
      return
    }
    let removedUnused = this.list.map((x)=>{return {ItemID:x.ItemID,Qty:x.Qty}})
    let jsonData = JSON.stringify({Home:this.homeBatchForm.value.Home,Batch:this.homeBatchForm.value.Batch,Items:removedUnused})
    this.store.dispatch(new fromTomasActions.TomasAddAdmTomas(jsonData))
    this.list = []
  }

}
