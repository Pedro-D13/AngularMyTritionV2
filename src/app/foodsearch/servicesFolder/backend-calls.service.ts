import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  CategoryList,
  CategoryItem,
  Macros,
} from "../models/api-data-interface";
import { Observable } from "rxjs";
import { share, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BackendCallsService {
  constructor(private http: HttpClient) {}
  readonly API_URL = "http://localhost:8000/foodsearch";
  private data: any = [];

  getCategoryList(description): Observable<CategoryList[]> {
    let codedDesc = encodeURI(description);
    return this.http
      .get<CategoryList[]>(`${this.API_URL}/${codedDesc}/desc/`)
      .pipe(shareReplay());
  }
  getCategoryItems(description, category): Observable<CategoryItem[]> {
    let codedDesc = encodeURIComponent(description);
    let codedCat = encodeURIComponent(category.branded_food_category);
    return this.http
      .get<CategoryItem[]>(
        `${this.API_URL}/${codedDesc}/desc/${codedCat}/category/`
      )
      .pipe(shareReplay());
  }

  getMacros(item): Observable<Macros[]> {
    return this.http.get<Macros[]>(`${this.API_URL}/${item.fdc_id}/macros/`);
  }
}
