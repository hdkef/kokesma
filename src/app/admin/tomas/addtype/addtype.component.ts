import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../redux/reducer/app-reducer'
import * as fromTomasActions from '../../../redux/actions/tomas-actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addtype',
  templateUrl: './addtype.component.html',
  styleUrls: ['./addtype.component.css']
})
export class AddtypeComponent implements OnInit, OnDestroy {

  typeForm:FormGroup
  info:string = 'status info'
  load:boolean
  subs:Subscription
  imgurl:string

  constructor(private store:Store<fromAppReducer.AppState>) { }
  ngOnDestroy(): void {
    if(this.subs){this.subs.unsubscribe()}
    this.store.dispatch(new fromTomasActions.TomasDeleteInfo())
  }

  ngOnInit(): void {
    this.subs = this.store.select("tomas").subscribe((x)=>{
      this.load = x["load"]
      if (x["info"] !== "null"){
        this.info = x["info"]
      }
    })
    this.typeForm = new FormGroup({
      'Nama':new FormControl(null,Validators.required),
      'Harga':new FormControl(null,[Validators.required, Validators.pattern("[0-9]{1,}")]),
      'Image':new FormControl(null,Validators.required)
    })
  }

  submit(){
    let nama = this.typeForm.value.Nama
    let harga = this.typeForm.value.Harga
    let image = this.typeForm.value.Image
    this.store.dispatch(new fromTomasActions.TomasAddItem({Nama:nama,Harga:harga,Image:image}))
  }

  checkImage(){
    this.imgurl = this.typeForm.value.Image
  }

}
