import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAppReducer from '../../redux/reducer/app-reducer'

@Injectable()
export class LoginToggle implements CanActivate{
    constructor(private store:Store<fromAppReducer.AppState>, private router:Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve,_)=>{
      this.store.select("auth").subscribe(x=>{
        console.log("member login toggle")
        if(x.token){
          this.router.navigateByUrl("/member/dashboard")
          resolve(false)
        }
        else{console.log("member login toggle reject");resolve(true)}
      })
    })
  }
}
