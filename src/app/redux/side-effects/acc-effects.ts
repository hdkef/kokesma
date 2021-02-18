import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as fromAccActions from '../actions/acc-actions'

@Injectable()

export class AccEffects {
  constructor(private actions$:Actions, private http:HttpClient){}

  @Effect()
  accInsert = this.actions$.pipe(
    ofType(fromAccActions.ACC_INSERT_START),
    switchMap((action:fromAccActions.AccInsert)=>{
      console.log("effect acc")
      let header = new HttpHeaders()
      header.append('content-type','application/json')
      let jsonData = JSON.stringify({Subject:action.payload.subject,Debit:action.payload.debit,Kredit:action.payload.kredit,Ket:action.payload.ket})
      return this.http.post(`${environment.api_url}/acc/insert`,jsonData,{headers:header})
      .pipe(map((x)=>{
        let message = x["MESSAGE"]
        return new fromAccActions.AccSendInfo(message)
      },catchError((err)=>{
        console.log('catcherror send info', err.error)
        return of(new fromAccActions.AccSendInfo(err.error))
      })))
    })
  )
}
