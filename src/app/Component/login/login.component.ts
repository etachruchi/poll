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
  loginForm:any;
  constructor(
    public apiServices:ApiService
  ) {}

  ngOnInit() {
    this.createLoginForm();
    console.log(this.apiServices);
  }
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(8)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.minLength(4)
      ])
    });
  }

  onSubmit(formData) {
    this.apiServices.postlogin(formData.value);
    this.loginForm.reset();
  }
  
}
