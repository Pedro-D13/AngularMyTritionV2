import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { Newuser } from "./newuser";
import { Loginuser } from "./loginuser";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticateService {
  readonly URL = "http://localhost:8000";

  constructor(private http: HttpClient) {}

  // requires a post request
  registerUser(data: Newuser) {
    return this.http
      .post(`${this.URL}/auth/users/`, data, {
        observe: "response",
      })
      .pipe(catchError(this.handleError));
  }

  // requires a post request
  loginUser(data: Loginuser) {
    return this.http
      .post(`${this.URL}/auth/token/login/`, data)
      .pipe(catchError(this.handleError));
  }

  // profile
  getProfileData() {
    let key = localStorage.getItem("token");
    sessionStorage;
    return this.http.get(`${this.URL}/profile/`, {
      headers: { Authorization: `token ${key}` },
    });
  }

  // log users out
  logout() {
    localStorage.removeItem("token");
    return this.http.post(`${this.URL}/auth/token/logout/`, {
      observe: "body",
    });
  }

  // handle errors
  handleError(errorRef: HttpErrorResponse) {
    if (errorRef.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", errorRef.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${errorRef.status}`);
      // for (let each in errorRef.error) {
      //   err.push(console.error(errorRef.error[`${each}`]));
      // }
    }
    // return an observable with a user-facing error message
    return throwError(errorRef.error);
  }
}
