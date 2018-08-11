import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/apiservice";
import { list } from "../model/listmodel";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  list: Array<list>;
  id: number;
  errorMessage: String;
  loader:boolean;
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
      if(res["error"]){
        this.errorMessage=res["message"];
      }
     else{
        this.list = res["data"].reverse();    
      }
    });
  }

  deletePoll(id) {
    let index = -1;
    this.loader=true;
        this.list.forEach((value, key) => {
      if (value["id"] == id) {
        index = key;
      }
    });
    this.apiServices.deletePoll(5000).subscribe(res => {
      if(res["error"]){
        this.errorMessage=res["message"];
      }else{
      this.loader=false;
      this.list.splice(index, 1);
    }},(err)=>{
      this.loader=false;
    });
  }
  updatePoll() {
    this.getPolls();
  }
}

