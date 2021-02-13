import * as fromAuthActions from '../actions/auth-actions'
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthEffects {

    logoutTimer:any

    @Effect()
    loginStart = this.actions$.pipe(
        ofType(fromAuthActions.LOGIN_START),
        switchMap((action:fromAuthActions.LoginStart)=>{
            let form = {NIM:action.payload.nim,Password:action.payload.password,Role:action.payload.role}
            let loginform = JSON.stringify(form)
            let header = new HttpHeaders()
            header.append('content-type','application/json')
            return this.http.post(`${environment.api_url}/login`,loginform,{headers:header})
            .pipe(map((x)=>{
                let id = x["ID"]
                let token = x["Token"]
                let expiresAt = x["ExpiresAt"]
                let role = x["Role"]
                let expiresAtDate = new Date(new Date().getTime() + expiresAt)
                this.saveToLocal(id,token,expiresAtDate,role)
                this.autoLogout(expiresAt)
                return new fromAuthActions.LoginSuccess({id:id,token:token,expiresAtDate:expiresAtDate,role:role})
            }),
            catchError(err=>{
                return of(new fromAuthActions.SendInfo(err.error))
            }))
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(fromAuthActions.AUTO_LOGIN),
        switchMap((action:fromAuthActions.AutoLogin)=>{
            if(localStorage.getItem("userData")){
                let userData = JSON.parse(localStorage.getItem("userData"))
                let id:number = userData["ID"]
                let token:string = userData["Token"]
                let expiresatdate = userData["ExpiresAtDate"]
                let role = userData["Role"]
                let duration = new Date(expiresatdate).getTime() - new Date().getTime()
                this.autoLogout(duration)
                return of(new fromAuthActions.LoginSuccess({id:id,token:token,expiresAtDate:expiresatdate,role:role}))
            }
            else{return of()}
        })
    )

    @Effect()
    registStart = this.actions$.pipe(
        ofType(fromAuthActions.REGIST_START),
        switchMap((action:fromAuthActions.RegistStart)=>{
            let header = new HttpHeaders()
            header.append('content-type','application/json')
            let jsonData = JSON.stringify({Rumah:action.payload["Rumah"],Nama:action.payload["Nama"],NIM:action.payload["NIM"],Password:action.payload["Password"],Role:action.payload["Role"]})
            return this.http.post(`${environment.api_url}/register`,jsonData,{headers:header})
            .pipe(map((x)=>{
                let m = x["MESSAGE"]
                return new fromAuthActions.SendInfo(m)
            },catchError((err)=>{
                return of(new fromAuthActions.SendInfo(err.error))
            })))
        })
    )

    // @Effect({dispatch:false})
    // redirectLogin = this.actions$.pipe(
    //     ofType(fromAuthActions.LOGIN_SUCCESS),
    //     tap(()=>{
    //         alert("executed")
    //         this.router.navigateByUrl("/member/dashboard")
    //     })
    // )

    @Effect({dispatch:false})
    redirectLogout = this.actions$.pipe(
        ofType(fromAuthActions.LOGOUT_START),
        tap(()=>{
            this.removeLocal()
            if (this.logoutTimer){
                clearTimeout(this.logoutTimer)
            }
            this.router.navigateByUrl("/member/login")
        })
    )

    constructor(private actions$:Actions, private http:HttpClient, private router:Router, private store:Store<fromAppReducer.AppState>){}

    saveToLocal(id,token,expiresatdate,role){
        let userData = {
            ID:id,
            Token:token,
            ExpiresAtDate:expiresatdate,
            Role:role
        }
        localStorage.setItem("userData",JSON.stringify(userData))
    }

    removeLocal(){
        localStorage.removeItem("userData")
    }

    autoLogout(duration){
        this.logoutTimer = setTimeout(()=>{
            this.store.dispatch(new fromAuthActions.LogoutStart())
        },duration)
    }
}