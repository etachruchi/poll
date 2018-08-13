import { Injectable } from '@angular/core';
import { CanActivate, 
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import { ApiService } from "./services/apiservice";
import { AppComponent } from './app.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginToken:string;
  constructor(public apiServices: ApiService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
     {
    if (JSON.parse(localStorage.getItem("token"))){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
  }  
}
