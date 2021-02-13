import { Component, Input, OnInit } from '@angular/core';
import { Tomas } from 'src/app/model/tomas';

@Component({
  selector: 'app-jurnal',
  templateUrl: './jurnal.component.html',
  styleUrls: ['./jurnal.component.css']
})
export class JurnalComponent implements OnInit {
  
  @Input() journal:Tomas[]
  constructor() { }

  ngOnInit(): void {
    
  }

}
