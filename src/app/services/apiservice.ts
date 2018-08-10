import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable()
export class ApiService {
  token: string;
  role: string;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      api_token: localStorage.getItem("token")
    })
  };

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
            this.token = data["data"].api_token;
            localStorage.setItem("token", this.token);
            this.httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                api_token: localStorage.getItem("token")
              })
            };
            resolve(data);
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
    const apidata = {
      title: post.title,
      options:post.option
      
    };
    return new Promise((resolve, reject) => {
      this.http
        .post(`${environment["apiBase"]}add_poll`, apidata, this.httpOptions)
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
    return this.http.get(
      `${environment["apiBase"]}list_polls`,
      this.httpOptions
    );
  }
  editpolltitle(id, post) {
    const apidata = {
      title: post.title
    };
    return this.http.put(
      `${environment["apiBase"]}update_poll_title/${id}`,
      apidata,
      this.httpOptions
    );
  }
  deletePoll(id) {
    return this.http.delete(
      `${environment["apiBase"]}delete_poll/${id}`,
      this.httpOptions
    );
  }
  addOption(id, post) {
    const apidata = { options: post.option }
    return this.http.post(
      `${environment["apiBase"]}add_poll_option/${id}`,
      apidata,
      this.httpOptions
    );
  }
  deleteOption(id, opt_id) {
    return this.http.delete(`${environment["apiBase"]}delete_poll_option/${id}/${opt_id}`, this.httpOptions);

  }
  vote(id, opt_id) {
    return this.http.put(`${environment["apiBase"]}vote/${id}/${opt_id}`, this.httpOptions);

  }
}
