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
            resolve(data);
          } else {
            reject(data);
          }
        });
      console.log(params.toString());
      console.log(post);
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
            resolve(data);
          } else {
            reject(data);
          }
        });
      console.log(params.toString());
      console.log(post);
    });
  }
}
