import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../services/apiservice";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-vote-poll",
  templateUrl: "./vote-poll.component.html",
  styleUrls: ["./vote-poll.component.css"]
})
export class VotePollComponent implements OnInit {
  @Output()
  updatePollEmitt = new EventEmitter();
  @Output()
  deletePollEmitt = new EventEmitter();
  @Input()
  pollData;
  id: number;
  opt_id: number;
  Pollid: string;
  selectedPoll = false;
  loader: boolean;
  errorMessage: string;
  submitted:boolean;
  pollArray: Array<number> = [];

  constructor(private apiServices: ApiService) {}

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("poll"))) {
      this.pollArray = JSON.parse(localStorage.getItem("poll"));
    }
  }

  deleteOption(id, opt_id) {
    let index = -1;
    this.pollData.options.forEach((value, key) => {
      if (value["id"] == id) {
        index = key;
      }
    });
    this.opt_id = opt_id;
    this.apiServices.deleteOption(id, opt_id).subscribe(
      res => {
        this.pollData.options.splice(index, 1);
        this.opt_id = null;
      },
      err => {
        this.errorMessage = err.data;
        this.opt_id = null;
      }
    );
  }
  deletePoll() {
    this.deletePollEmitt.emit(this.pollData.id);
  }
  updatePoll() {
    this.updatePollEmitt.emit(this.pollData.id);
  }
  onSubmitvote(opt_id) {
    this.loader = true;
    this.apiServices.vote(this.pollData.id, opt_id.poll).subscribe(
      res => {
        this.loader = false;
        if (this.pollArray.indexOf(this.pollData.id) == -1) {
          this.pollArray.push(this.pollData.id);
          localStorage.setItem("poll", JSON.stringify(this.pollArray));
        }
        this.updatePollEmitt.emit(res["data"]);
      },
      err => {
        this.errorMessage = err.data;
        this.loader = false;
      }
    );
  }
  isDisabled(id) {
    if (this.pollArray.indexOf(id) != -1) {
      this.submitted=true;
      return true;
    } else {
      this.submitted=false;
      return false;
    }
  }
}
