import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { ApiService } from './services/apiservice';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SidemenuComponent } from './Component/sidemenu/sidemenu.component';
import { AddpollComponent } from './Component/addpoll/addpoll.component';
import { ListComponent } from './Component/list/list.component';
import { ViewpollComponent } from './Component/viewpoll/viewpoll.component';
import { AddOptionComponent } from './Component/add-option/add-option.component';
import { VotePollComponent } from './Component/vote-poll/vote-poll.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,RegisterComponent, SidemenuComponent, AddpollComponent, ListComponent, ViewpollComponent, AddOptionComponent, VotePollComponent, 
  

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
