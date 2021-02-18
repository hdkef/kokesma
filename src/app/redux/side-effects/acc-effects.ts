import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Acc } from "src/app/model/acc";
import { environment } from "src/environments/environment";
import * as fromAccActions from '../actions/acc-actions'

@Injectable()

export class AccEffects {
  constructor(private actions$:Actions, private http:HttpClient){}

  @Effect()
  accInsert = this.actions$.pipe(
    ofType(fromAccActions.ACC_INSERT_START),
    switchMap((action:fromAccActions.AccInsert)=>{
      let header = new HttpHeaders()
      header.append('content-type','application/json')
      let jsonData = JSON.stringify({Subject:action.payload.subject,Debit:action.payload.debit,Kredit:action.payload.kredit,Ket:action.payload.ket})
      return this.http.post(`${environment.api_url}/acc/insert`,jsonData,{headers:header})
      .pipe(map((x)=>{
        let message = x["MESSAGE"]
        return new fromAccActions.AccSendInfo(message)
      }),
      catchError(err=>{
        return of(new fromAccActions.AccSendInfo(err.error))
      }))
    })
  )

  @Effect()
  accJournal = this.actions$.pipe(
    ofType(fromAccActions.ACC_JOURNAL_START),
    switchMap((action:fromAccActions.AccJournalStart)=>{
      let jsonData = JSON.stringify({FDate:action.payload.FDate,SDate:action.payload.SDate})
      let header = new HttpHeaders()
      header.append('content-type','application/json')
      return this.http.post(`${environment.api_url}/acc/journal`,jsonData,{headers:header})
      .pipe(map((x)=>{
        return new fromAccActions.AccJournalSuccess(x)
      },catchError((err)=>{
        return of(new fromAccActions.AccSendInfo(err.error))
      })))
    })
  )
}
