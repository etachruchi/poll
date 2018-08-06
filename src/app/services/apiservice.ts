import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { reject, resolve } from "q";
@Injectable()
export class ApiService {
  token: any;
  role: any;
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
    this.role = localStorage.getItem("role").toLowerCase();
    if (this.role == "admin") {
      return this.http.get(
        `${environment["apiBase"]}list_polls`,
        this.httpOptions
      );
    } else {
      return this.http.get(
        `${environment["apiBase"]}list_poll`,
        this.httpOptions
      );
    }
  }
  listpoll() {
    this.role = localStorage.getItem("role").toLowerCase();
    return this.http.get(
      `${environment["apiBase"]}list_poll`,
      this.httpOptions
    );
  }

  editpolltitle(id, post) {
    const apidata = {
      title: post.title
    };
    console.log(apidata);

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
}
