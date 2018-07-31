import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/apiservice";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessage: String;
  constructor(public apiServices: ApiService, private router: Router) {}

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        Validators.minLength(8)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
        Validators.minLength(4)
      ])
    });
  }

  onSubmit(formData) {
    this.apiServices.postlogin(formData.value).then(
      res => {
          this.router.navigate(["/sidemenu"]);
          this.loginForm.reset();
       
      }).catch(err => {
        this.errorMessage=err.data;
      });
  }
}
