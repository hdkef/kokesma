import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromTomasActions from '../actions/tomas-actions'
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import { environment } from 'src/environments/environment'
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { Tomas } from "src/app/model/tomas";

@Injectable()
export class TomasEffects {

    constructor(private actions$:Actions, private http:HttpClient, private router:Router, private store:Store<fromAppReducer.AppState>){}

    @Effect()
    adminInit = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_ADM_INIT),
        switchMap((action:fromTomasActions.TomasAdmInit)=>{
            return this.http.get(`${environment.api_url}/tomas/init`)
            .pipe(map((x)=>{
                let home = x["Home"]
                let name = x["ItemsName"]
                let id = x["Items"]
                return new fromTomasActions.TomasAdmSuccess({admHome:home,admItemName:name,admItemID:id})
            }),
            catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })
            )
        })
    )

    @Effect()
    addItem = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_ADD_ITEM),
        switchMap((action:fromTomasActions.TomasAddItem)=>{
            let jsonData = JSON.stringify({Harga:action.payload["Harga"],Nama:action.payload["Nama"],Image:action.payload["Image"]})
            let header = new HttpHeaders()
            header.append('content-type','application/json')
            return this.http.post(`${environment.api_url}/tomas/additem`,jsonData,{headers:header})
            .pipe(map((x)=>{
                let message = x["MESSAGE"]
                return new fromTomasActions.TomasSendInfo(message)
            },catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })))
        })
    )

    @Effect()
    addMemTomas = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_ADD_MEMTOMAS),
        switchMap((action:fromTomasActions.TomasAddMemTomas)=>{
            let header = new HttpHeaders()
            header.append('content-type','application/json')
            return this.http.post(`${environment.api_url}/tomas/meminputtomas`,action.payload,{headers:header})
            .pipe(map((x)=>{
                let message = x["MESSAGE"]
                return new fromTomasActions.TomasSendInfo(message)
            },catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })))
        })
    )

    @Effect()
    addAdmTomas = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_ADD_ADMTOMAS),
        switchMap((action:fromTomasActions.TomasAddAdmTomas)=>{
            let jsonData = JSON.stringify({House:action.payload["House"],ItemID:action.payload["ItemID"],Batch:action.payload["Batch"],Qty:action.payload["Qty"]})
            let header = new HttpHeaders()
            header.append('content-type','application/json')
            return this.http.post(`${environment.api_url}/tomas/adminputtomas`,jsonData,{headers:header})
            .pipe(map((x)=>{
                let message = x["MESSAGE"]
                return new fromTomasActions.TomasSendInfo(message)
            },catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })))
        })
    )

    @Effect()
    memInit = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_MEM_INIT),
        switchMap((action:fromTomasActions.TomasMemInit)=>{
            return this.http.get(`${environment.api_url}/tomas/meminit`)
            .pipe(map((x)=>{
                let curstock:Tomas[] = x["Curstock"]
                let journal:Tomas[] = x["Journal"]
                return new fromTomasActions.TomasMemSuccess({curstock:curstock,journal:journal})
            },catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })))
        })
    )


    @Effect()
    monitor = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_ADM_MONITOR),
        switchMap((action:fromTomasActions.TomasAdmMonitor)=>{
            let header = new HttpHeaders()
            header.append('content-type','application/json')
            let housejson = JSON.stringify({Rumah:action.payload})
            return this.http.post(`${environment.api_url}/tomas/admmonitor`,housejson,{headers:header})
            .pipe(map((x)=>{
                let monuser = x["User"]
                let monjournal = x["Journal"]
                let moncurstock = x["Curstock"]
                let monstocklist = x["Stock"]
                let sum = x["Sum"]
                return new fromTomasActions.TomasAdmMonitorSuccess({monuser:monuser,monjournal:monjournal,moncurstock:moncurstock,monstocklist:monstocklist,sum:sum})
            },catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })))
        })
    )

    @Effect()
    backupReset = this.actions$.pipe(
        ofType(fromTomasActions.TOMAS_ADM_BACKUPRESET),
        switchMap((action:fromTomasActions.TomasAdmBackupReset)=>{
            return this.http.get(`${environment.api_url}/tomas/backupreset`)
            .pipe(map((x)=>{
                let message = x["MESSAGE"]
                return new fromTomasActions.TomasSendInfo(message)
            },catchError((err)=>{
                return of(new fromTomasActions.TomasSendInfo(err.error))
            })))
        })
    )

    // @Effect()
    // memJournal = this.actions$.pipe(
    //     ofType(fromTomasActions.TOMAS_MEM_JOURNAL),
    //     switchMap((action:fromTomasActions.TomasMemJournal)=>{
    //         return this.http.get<Tomas[]>(`${environment.api_url}/tomas/memgetjournal`)
    //         .pipe(map((x)=>{
    //             return new fromTomasActions.TomasMemJournalSuccess({journal:x})
    //         },catchError((err)=>{
    //             return of(err.error)
    //         })))
    //     })
    // )

    // @Effect()
    // admCurstock = this.actions$.pipe(
    //     ofType(fromTomasActions.TOMAS_ADM_CURSTOCK),
    //     switchMap((action:fromTomasActions.TomasAdmCurstock)=>{
    //         let header = new HttpHeaders()
    //         header.append('content-type','application/json')
    //         let jsonData = JSON.stringify({Rumah:action.payload})
    //         return this.http.post<Tomas[]>(`${environment.api_url}/tomas/admgetcurstocklist`,jsonData,{headers:header})
    //         .pipe(map((x)=>{
    //             return new fromTomasActions.TomasAdmCurstockSuccess({curstock:x})
    //         },catchError((err)=>{
    //             return of(err.error)
    //         })))
    //     })
    // )
}
