import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Component/login/login.component";
@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state.url);
    if (
      state.url.includes("login") &&
      JSON.parse(localStorage.getItem("token"))
    ) {
      this.router.navigate(["/sidemenu/list"]);
      return false;
    } else if (
      state.url.includes("login") &&
      !JSON.parse(localStorage.getItem("token"))
    ) {
      return true;
    } else {
      if (JSON.parse(localStorage.getItem("token"))) {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    }
  }
}
