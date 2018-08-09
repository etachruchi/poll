import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  constructor(
    private apiServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addoption();
  }
  addoption() {
    this.addOption = new FormGroup({
      Option: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ])
    });
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
