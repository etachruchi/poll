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
  option: FormArray;
  constructor(
    public apiServices: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addpollForm = this.formBuilder.group({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      option: this.formBuilder.array([this.createOption()])
    });
  }
  createOption(): FormGroup {
    return this.formBuilder.group({
      option: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }
  addItem(): void {
    this.option = this.addpollForm.get("option") as FormArray;
    this.option.push(this.createOption());
  }
  removeinput(index:number): void{
    if (this.option && this.option.length>1){
  this.option = this.addpollForm.get("option") as FormArray;
  this.option.removeAt(index);
  }
  }
  onSubmit(formData) {
    this.loading = true;
    console.log(formData.value);
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
