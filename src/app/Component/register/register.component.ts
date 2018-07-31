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
  errorMessage: String;
  loading:boolean;
  constructor(public apiServices: ApiService, private router: Router) {}

  ngOnInit() {
    this.SignupForm = new FormGroup(
      {
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
        ]),
        Role: new FormControl("", [Validators.required]),
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
    this.loading= true;
    this.apiServices.postregister(formData.value).then(
      res => {
        this.loading=false;
        this.router.navigate(["/login"]);
        this.SignupForm.reset();
        

      }).catch(err => {
        this.loading = false;
        this.errorMessage = err.data;
      });
  }
}


