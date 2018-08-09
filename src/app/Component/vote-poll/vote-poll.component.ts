import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../services/apiservice";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-vote-poll",
  templateUrl: "./vote-poll.component.html",
  styleUrls: ["./vote-poll.component.css"]
})
export class VotePollComponent implements OnInit {
  @Output() updatePollEmitt = new EventEmitter();
  @Output() deletePollEmitt = new EventEmitter();
  submitted: boolean;
  @Input() pollData;
  id: number;
  opt_id: string;
  Pollid: string;
  selectedPoll = false;
  constructor(
    private apiServices: ApiService,
  ) {}

  ngOnInit() {}

  deleteOption(id, opt_id) {

    let index = -1;
    this.pollData.options.forEach((value, key) => {
      if (value['id'] == id) {
        index = key;
      }
    });
    this.apiServices.deleteOption(id, opt_id).subscribe(res => { 
    this.pollData.options.splice(index, 1)
    });
  }
  deletePoll(id) {
    this.deletePollEmitt.emit(this.pollData.id);
  }
  updatePoll(id) {
    this.updatePollEmitt.emit(this.pollData.id);
  }
  onSubmitvote(opt_id) {
    this.apiServices.vote(this.pollData.id, opt_id.poll).subscribe(res => {
      this.updatePollEmitt.emit(res["data"]);
    });
  }
}
