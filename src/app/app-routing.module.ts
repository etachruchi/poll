import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./Component/register/register.component";
import { LoginComponent } from "./Component/login/login.component";
import { SidemenuComponent } from "./Component/sidemenu/sidemenu.component";
import { AddpollComponent } from './Component/addpoll/addpoll.component';
import { ListComponent } from './Component/list/list.component';
const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "sidemenu", component: SidemenuComponent },
  { path: "addpoll", component: AddpollComponent},
  { path: "list", component:ListComponent }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
