import { Component } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) { 
   this.isLogedIn();
  }
  isLogedIn() {
    if (JSON.parse(localStorage.getItem("token"))) {
      this.router.navigate(["/sidemenu]"]);
    }
    else{
      this.router.navigate(["/login"]);

    }
  }
}

