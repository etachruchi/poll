import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
import { list } from "../model";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  list:Array <list>;
  id: number;
  opt_id: string;
  errorMessage: String;
  constructor(
    private apiServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {
    this.apiServices.listpolls().subscribe(res => {
      this.list = res["data"].reverse();
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
  updatePollEmitt(id){
      this.getPolls();
    }
}
