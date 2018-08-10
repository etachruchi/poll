import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../../services/apiservice";
@Component({
  selector: "app-add-option",
  templateUrl: "./add-option.component.html",
  styleUrls: ["./add-option.component.css"]
})
export class AddOptionComponent implements OnInit {
  addOption: FormGroup;
  id: string;
  loading: boolean;
  errorMessage: String;

  option: FormArray;
  constructor(
    public apiServices: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.addOption = this.formBuilder.group({
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
    this.option = this.addOption.get("option") as FormArray;
    this.option.push(this.createOption());
  }
  removeinput(index: number): void {
    if (this.option && this.option.length > 1) {
      this.option = this.addOption.get("option") as FormArray;
      this.option.removeAt(index);
    }
  }
  onSubmit(formData) {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.apiServices.addOption(this.id, formData.value).subscribe(res => {
      this.loading = false;
      this.router.navigate(["/list"]);
      this.addOption.reset();
    });
  }
}
