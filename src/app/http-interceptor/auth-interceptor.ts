import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as fromAppReducer from '../redux/reducer/app-reducer'
import { select, Store } from '@ngrx/store';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store:Store<fromAppReducer.AppState>) { }

  addToken(req:HttpRequest<any>): Observable<HttpRequest<any>>{
    return this.store.pipe(
      select("auth"),
      first(),
      mergeMap((state,_)=>{
        if (state.token){
          let tokenHead = `bearer ${state.token}`
          let authorizedReq = req.clone({headers:req.headers.append("Auth",tokenHead)})
          return of(authorizedReq)
        }
        else{of(req)}
      })
    )
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    // return this.addToken(req).pipe(
    //   first(),
    //   mergeMap((reqWithToken:HttpRequest<any>)=>{return next.handle(reqWithToken)})
    // )
    let tokenGet = JSON.parse(localStorage.getItem("userData"))
    if (tokenGet == null) {
      return next.handle(req)
    }
    else {
      let tokenHead = `bearer ${tokenGet["Token"]}`
      let authorizedReq = req.clone({headers:req.headers.append("Auth",tokenHead)})
      return next.handle(authorizedReq)
    }
  }
}
