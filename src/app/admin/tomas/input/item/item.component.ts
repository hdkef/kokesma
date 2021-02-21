import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tomas } from 'src/app/model/tomas';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item:Tomas
  @Output() addItemEvent = new EventEmitter()

  itemForm:FormGroup
  constructor() { }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      'Qty':new FormControl(null,[Validators.required,Validators.pattern('[0-9]{1,}')])
    })
  }

  add(){
    let object = {
      ItemID:this.item.ItemID,
      Nama:this.item.Nama,
      Qty:this.itemForm.value.Qty
    }
    let jsonData = JSON.stringify(object)
    this.addItemEvent.emit(jsonData)
  }

}
