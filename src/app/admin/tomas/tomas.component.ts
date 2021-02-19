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

  toggleInputTomas = false
  toggleAddItems = false
  info:string = "status update"
  homeOptions:string[]
  itemsNameOptions:string[]
  itemsIDOptions:any[]
  subs:Subscription
  load:boolean
  addAdmTomasForm:FormGroup
  addItemForm:FormGroup

  constructor(private store:Store<fromAppReducer.AppState>) { }
  ngOnDestroy(): void {
    if (this.subs){
      this.subs.unsubscribe()
    }
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.addAdmTomasForm = new FormGroup({
      'Rumah':new FormControl(null,Validators.required),
      'Item':new FormControl(null,Validators.required),
      'Qty':new FormControl(null, [Validators.required, Validators.pattern("[0-9]{1,}")]),
      'Batch':new FormControl(null,Validators.required),
    })

    this.addItemForm = new FormGroup({
      'Nama':new FormControl(null,Validators.required),
      'Harga':new FormControl(null, [Validators.required, Validators.pattern("[0-9]{1,}")]),
      'Image':new FormControl(null,Validators.required),
    })

    this.store.dispatch(new fromTomasActions.TomasAdmInit)
    this.subs = this.store.select("tomas").subscribe(x=>{
      this.load = x["load"]
      this.homeOptions = x.admHome
      this.itemsNameOptions = x.admItemsName
      this.itemsIDOptions = x.admItemsID
      if (x["info"] !== "null"){
        this.info = x["info"]
      }
    })

  }

  toggleInTomas(){
    this.toggleAddItems = false
    this.toggleInputTomas = true
  }

  toggleAddTomas(){
    this.toggleAddItems = true
    this.toggleInputTomas = false
  }

  addItem(){
    this.store.dispatch(new fromTomasActions.TomasAddItem({Nama:this.addItemForm.value.Nama,Harga:this.addItemForm.value.Harga,Image:this.addItemForm.value.Image}))
  }

  addAdmTomas(){
    this.store.dispatch(new fromTomasActions.TomasAddAdmTomas({ItemID:this.addAdmTomasForm.value.Item,House:this.addAdmTomasForm.value.Rumah,Qty:this.addAdmTomasForm.value.Qty,Batch:this.addAdmTomasForm.value.Batch}))
  }

  backupReset(){
    this.store.dispatch(new fromTomasActions.TomasAdmBackupReset())
  }

}
