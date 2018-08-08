import { Component, OnInit, Input, EventEmitter  } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
import * as _ from "lodash"; 
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  @Input() inputEmitter = new EventEmitter();
  list: any;
  id: number;
  opt_id: string;
  errorMessage: String;
  vote: number;
  Polls;
  submitted: boolean;
  pollId:any;
  pollsArray: Array<any>;
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
  // onSubmit(id, opt_id) {
  //   this.apiServices.vote(id, opt_id).subscribe(res => {
  //     this.getPolls();
  //   });
  // }
  onSubmit(poll) {
    if (_.indexOf(this.pollsArray, poll.id) == -1) {
      this.pollsArray.push(poll.id);
    }
    this.apiServices.vote(poll.id, this.pollId).subscribe(res => {
      this.getPolls();
    });
    localStorage.setItem("poll", JSON.stringify(this.pollsArray));
  }

  setOptionId(opt_id) {
    this.pollId = opt_id;
  }
  isDisabled(id) {
    if (_.indexOf(this.pollsArray, id) != -1) {
      this.submitted = true;
      return true;
    } else {
      this.submitted = false;
      return false;
    }
  }
}
