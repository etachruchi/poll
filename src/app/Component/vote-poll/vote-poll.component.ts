import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../services/apiservice";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-vote-poll",
  templateUrl: "./vote-poll.component.html",
  styleUrls: ["./vote-poll.component.css"]
})
export class VotePollComponent implements OnInit {
  @Output() updatePoll = new EventEmitter();
  @Output() deletePoll = new EventEmitter();
  submitted: boolean;
  @Input() pollData;
  id: number;
  opt_id: string;
  Pollid: string;
  pollsArray: Array<any> = [];
  selectedPoll = false;
  constructor(
    private apiServices: ApiService,
  ) {}

  ngOnInit() {}

  deleteOption(id, opt_id) {
    _.remove(this.pollData.options, { opt_id: opt_id });
    this.apiServices.deleteOption(id, opt_id).subscribe(res => {});
  }
  deletePollfun(id) {
    this.deletePoll.emit(this.pollData.id);
  }
  updatePollfunction(id) {
    this.updatePoll.emit(this.pollData.id);
  }
  onSubmit(opt_id) {
    this.apiServices.vote(this.pollData.id, opt_id.poll).subscribe(res => {
      this.updatePoll.emit(res["data"]);
    });
  }
}
