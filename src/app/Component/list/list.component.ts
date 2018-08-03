import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
import { forEach } from "@angular/router/src/utils/collection";
import { element } from "protractor";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  list: any;
  count = 0;
  id: any;
  constructor(
    private apiServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiServices.listpolls().subscribe(res => {
      this.list = res["data"];
    });
  }
  deletePoll(id) {
    let index = -1;
    this.list.forEach((value, key) => {
      if (value["id"] == id) {
        index = key;
      }
    });
  this.apiServices.deletePoll(id).subscribe(res => {
  this.list.splice(index, 1);
    });
  }
}
