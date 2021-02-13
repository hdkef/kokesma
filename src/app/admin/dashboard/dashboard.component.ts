import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  show:boolean = false
  monitorForm:FormGroup

  ngOnInit(): void {
    this.monitorForm = new FormGroup({
      'Rumah':new FormControl(null,Validators.required)
    })
  }

  navigate(url){
    this.router.navigateByUrl(url)
  }

  showForm(){
    if (this.show){
      this.show = false
    }
    else {this.show = true}
  }

  goMonitor(){
    this.router.navigateByUrl(`/admin/monitor/${this.monitorForm.value.Rumah}`)
  }

}
