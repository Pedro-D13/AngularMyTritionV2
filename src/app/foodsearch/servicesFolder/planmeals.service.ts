import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { FavFoodList } from "../models/api-data-interface";

// crud operations for favourite food

@Injectable({
  providedIn: "root",
})
export class PlanmealsService {
  readonly URL = "http://localhost:8000";
  readonly key = localStorage.getItem("token");

  constructor(private http: HttpClient) {}

  public getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `token ${this.key}`,
      }),
    };
    return httpOptions;
  }

  getPlanMealsData() {
    let httpOptions = this.getHeaders();
    return this.http.get<FavFoodList[]>(`${this.URL}/profile/`, {
      headers: httpOptions.headers,
      observe: "body",
    });
  }

  postPlanMealsData(item) {
    let httpOptions = this.getHeaders();
    return this.http.post(`${this.URL}/profile/${item}/`, `${item}`, {
      headers: httpOptions.headers,
      observe: "body",
    });
  }

  deletePlanMealsData(item) {
    let httpOptions = this.getHeaders();
    return this.http.delete(`${this.URL}/profile/${item}/`, {
      headers: httpOptions.headers,
      observe: "response",
    });
  }
}
