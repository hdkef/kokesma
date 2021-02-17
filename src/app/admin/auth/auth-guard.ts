import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAppReducer from '../../redux/reducer/app-reducer'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store:Store<fromAppReducer.AppState>, private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve,_)=>{
      this.store.select("auth").subscribe(x=>{
        if(x.role == "PBU" || x.role == "ACC" || x.role == "ADM"){
          resolve(true)
        }
        else{this.router.navigateByUrl("/admin/login");resolve(false)}
      })
    })
  }
}
