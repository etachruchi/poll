import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { reject, resolve } from "q";
@Injectable()
export class ApiService {
  token: any;
  role: any;

  constructor(private http: HttpClient) {}
  postlogin(post) {
    const apidata = { email: post.email, password: post.password };

    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment["apiBase"]}login`, apidata)
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            resolve(data);
            this.token = data["data"].api_token;

            localStorage.setItem("role", data["data"].role);
            localStorage.setItem("token", this.token);
          }
        });
    });
  }
  postregister(post) {
    const apidata = {
      name: post.name,
      email: post.email,
      password: post.password,
      role: post.Role
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment["apiBase"]}add_user`, apidata)
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }
  addpoll(post) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        api_token: localStorage.getItem("token")
      })
    };
    const apidata = {
      title: post.title,
      options: [
        { option: post.option1 },
        { option: post.option2 },
        { option: post.option3 },
        { option: post.option4 }
      ]
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment["apiBase"]}add_poll`, apidata, httpOptions)
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }
 
  listpolls() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        api_token: localStorage.getItem("token")
      })
    };
    this.role = localStorage.getItem("role").toLowerCase();
    if (this.role == "admin") {
      return this.http.get(`${environment["apiBase"]}list_polls`, httpOptions);
    } else {
      return this.http.get(`${environment["apiBase"]}list_poll`, httpOptions);
    }
  }
  listpoll() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        api_token: localStorage.getItem("token")
      })
    };
    this.role = localStorage.getItem("role").toLowerCase();
    return this.http.get(`${environment["apiBase"]}list_poll`, httpOptions);
  }
  
  editpolltitle(id,post) {
    const apidata = {
      title: post.title,  
    };
    console.log(apidata);
    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        api_token: localStorage.getItem("token")
      })
    };
     return this.http.put(`${environment["apiBase"]}update_poll_title/${id}`,apidata, httpOptions);
  }
 deletePoll(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        api_token: localStorage.getItem("token")
      })
    };
    console.log(id);
    
    return this.http.delete(`${environment["apiBase"]}delete_poll/${id}`, httpOptions);
    
  }

}