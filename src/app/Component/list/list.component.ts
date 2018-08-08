import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  list: any;
  id: number;
  opt_id: string;
vote:number;
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
  deleteOption(id, opt_id) {
    this.opt_id = this.activatedRoute.snapshot.paramMap.get("opt_id");
    let index = null;
    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list[i]["options"].length; j++) {
        if (opt_id == this.list[i]["options"][j]["opt_id"]) {
          index = this.list[i]["options"][j]["opt_id"];
          this.list[i]["options"].splice(j, 1);
        }
      }
    }
    this.apiServices.deleteOption(id, opt_id).subscribe(res => {});
  }

  doVote(id, opt_id) {
    this.apiServices.vote(id, opt_id).subscribe(res => {
      this.getPolls();
     });
  }
}
