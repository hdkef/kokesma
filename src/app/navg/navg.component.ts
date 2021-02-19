import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navg',
  templateUrl: './navg.component.html',
  styleUrls: ['./navg.component.css']
})
export class NavgComponent implements OnInit {

  show:boolean = false

  constructor() { }

  ngOnInit(): void {

  }

  showHide(){
    if (this.show){
      this.show = false
    }
    else{this.show = true}
  }

}
