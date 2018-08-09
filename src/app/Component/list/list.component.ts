import { Component, OnInit, Input, loadDirective } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
import { list } from "../model";
import * as _ from "lodash"; 
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  list: list;
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
    this.apiServices.deletePoll(id).subscribe(res => {
      _.remove(this.list,{'id':id});
    });
  }
        updatePoll(id){
      this.getPolls();
      }
}
