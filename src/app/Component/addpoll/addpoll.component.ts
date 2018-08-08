import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl,FormArray,FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/apiservice";

@Component({
  selector: "app-addpoll",
  templateUrl: "./addpoll.component.html",
  styleUrls: ["./addpoll.component.css"]
})
export class AddpollComponent implements OnInit {
  addpollForm: any;
  errorMessage: String;
  loading: boolean;
  constructor(public apiServices: ApiService, private router: Router) {}

  ngOnInit() {
    this.addPollForm();
  }
  addPollForm() {
    this.addpollForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      option1: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      option2: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      option3: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      option4: new FormControl("", [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  onSubmit(formData) {
    this.loading = true;
    this.apiServices.addpoll(formData.value).then(res => {
      this.loading = false;
      if (res && res["error"]) {
        this.errorMessage = res["data"];
      } else {
       this.router.navigate(["/list"]);
      }
    });
  }
  
}
