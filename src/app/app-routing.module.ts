import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./Component/register/register.component";
import { LoginComponent } from "./Component/login/login.component";
import { SidemenuComponent } from "./Component/sidemenu/sidemenu.component";
import { AddpollComponent } from './Component/addpoll/addpoll.component';
import { ListComponent } from './Component/list/list.component';
import { ViewpollComponent } from "./Component/viewpoll/viewpoll.component";
import { AddOptionComponent } from "./Component/add-option/add-option.component";
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "sidemenu", component: SidemenuComponent },
  { path: "addpoll", component: AddpollComponent },
  { path: "list", component: ListComponent },
  { path: "viewpoll/:id", component: ViewpollComponent },
  { path: "addoption/:id", component: AddOptionComponent}
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule {}
