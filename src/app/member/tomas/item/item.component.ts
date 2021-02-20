import { EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Tomas } from 'src/app/model/tomas';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Output() addItemEvent = new EventEmitter()
  @Input() curstock:Tomas

  qty:Number = 0

  constructor() { }

  ngOnInit(): void {
  }

  addMinQty(value){
    this.qty = this.qty + value
    if (this.qty < 0) {
      this.qty = 0
    }
    else if (this.qty > this.curstock.Qty){
      this.qty = this.curstock.Qty
    }
  }

  add(){
    let qty = this.qty
    if (qty == 0) {
      alert("ga bisa add 0 item")
      return
    }
    let object = {
    ItemID:this.curstock.ItemID,
    Nama:this.curstock.Nama,
    Qty:this.qty,
    Total:<any>this.qty * <any>this.curstock.Harga}
    let jsonData = JSON.stringify(object)
    this.addItemEvent.emit(jsonData)
  }

}
