import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  postlogin(post) {
    const params = new HttpParams()
      .set("username", post.email)
      .set("password", post.password);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment["apiBase"]}login`, {
          params: params
        })
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }
  postregister(post) {
    const params = new HttpParams()
      .set("username", post.email)
      .set("password", post.password)
      .set("role", post.role);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment["apiBase"]}add_user`, { params: params })
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
    const params = new HttpParams()
      .set("tittle", post.tittle)
      .set("options", post.option1 + "____" + post.option2 + "____" + post.option3 +"____"+post.option4);
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment["apiBase"]}add_poll`, { params: params })
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }
  listpoll(post) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment["apiBase"]}list_polls`)
        .subscribe(data => {
          if (data["error"] && data["error"] === 1) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }
}
