import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./Component/register/register.component";
import { LoginComponent } from "./Component/login/login.component";
import { SidemenuComponent } from "./Component/sidemenu/sidemenu.component";
import { AddpollComponent } from './Component/addpoll/addpoll.component';
import { ListComponent } from './Component/list/list.component';
import { ViewpollComponent } from "./Component/viewpoll/viewpoll.component";
import { AddOptionComponent } from "./Component/add-option/add-option.component";
import { ListusersComponent } from "./Component/listusers/listusers.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", canActivate: [AuthGuard],component: LoginComponent },
  { path: "register", canActivate: [AuthGuard],component: RegisterComponent} ,
  {
    path: "sidemenu", canActivate: [AuthGuard],component: SidemenuComponent ,
  children:[
    { path: "", redirectTo: "/list", pathMatch: "full" },
    { path: "addpoll", canActivate: [AuthGuard], component: AddpollComponent },
    { path: "list", canActivate: [AuthGuard],  component:ListComponent},
    { path: "listusers", canActivate: [AuthGuard],component:ListusersComponent},
    { path: "viewpoll/:id", canActivate: [AuthGuard], component: ViewpollComponent },
    { path: "addoption/:id", canActivate: [AuthGuard], component: AddOptionComponent}
  ]
  }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule {}
