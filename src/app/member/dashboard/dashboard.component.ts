import { Component, OnInit } from '@angular/core';
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../../redux/actions/auth-actions'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store:Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
  }

  logout(){
      this.store.dispatch(new fromAuthActions.LogoutStart())
  }

}
