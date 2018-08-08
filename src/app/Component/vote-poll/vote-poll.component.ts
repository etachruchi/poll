import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as _ from "lodash";
@Component({
  selector: "app-vote-poll",
  templateUrl: "./vote-poll.component.html",
  styleUrls: ["./vote-poll.component.css"]
})
export class VotePollComponent implements OnInit {
  @Output() updatePoll = new EventEmitter();
  @Output() deletePoll = new EventEmitter();
  submitted: boolean;
  @Input() parentData;
  id: number;
  opt_id: string;
  Pollid: string;
  pollsArray: Array<any> = [];
  selectedPoll = false;
  constructor(
    private apiServices: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  deleteOption(id, opt_id) {
    _.remove(this.parentData.options, { opt_id: opt_id });
    this.apiServices.deleteOption(id, opt_id).subscribe(res => {});
  }
  deletePollfun(id) {
    this.deletePoll.emit(this.parentData.id);
  }
  updatePollfunction(id) {
    this.updatePoll.emit(this.parentData.id);
  }
  onSubmit(opt_id) {
    this.apiServices.vote(this.parentData.id, opt_id.poll).subscribe(res => {
      this.updatePoll.emit(res["data"]);

    });
  
  }

  isDisabled() {
    if(_.indexOf(this.pollsArray,this.parentData.id) != -1) {
      this.submitted = true;
      return true;
    } else {
      this.submitted = false;
      return false;
    }
  }
}
