import { Component, OnInit } from '@angular/core';
import * as fromAppReducer from './redux/reducer/app-reducer'
import * as fromAuthActions from './redux/actions/auth-actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.store.dispatch(new fromAuthActions.AutoLogin())
  }

  constructor(private store:Store<fromAppReducer.AppState>){}
  title = 'pure';
}
