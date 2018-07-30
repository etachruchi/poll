import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/apiservice";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  SignupForm: any;
  constructor(public apiServices: ApiService) {}

  ngOnInit() {
    this.SignupForm = new FormGroup(
      {
        email: new FormControl("", [
          Validators.required,
          Validators.email,
          Validators.minLength(8)
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          ),
          Validators.minLength(4)
        ]),
        conpassword: new FormControl("", [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          ),
          Validators.minLength(4)
        ])
      },
      this.pwdMatchValidator
    );
  }
  pwdMatchValidator(frm: FormGroup) {
    return frm.get("password").value === frm.get("conpassword").value
      ? null
      : { mismatch: true };
  }

  onSubmit(formData) {
    this.apiServices.postregister(formData.value);
    this.SignupForm.reset();
  }
}
