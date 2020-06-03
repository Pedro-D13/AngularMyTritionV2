import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  CategoryList,
  CategoryItem,
  Macros,
  User,
} from "../../foodsearch/api-data-interface";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BackendCallsService {
  constructor(private http: HttpClient) {}
  readonly API_URL = "http://localhost:8000/foodsearch";
  private data: any = [];

  getCategoryList(description): Observable<CategoryList[]> {
    return this.http.get<CategoryList[]>(
      `${this.API_URL}/${description}/desc/`
    );
  }
  getCategoryItems(description, category): Observable<CategoryItem[]> {
    return this.http.get<CategoryItem[]>(
      `${this.API_URL}/${description}/desc/${category.branded_food_category}/category/`
    );
  }

  getMacros(item): Observable<Macros[]> {
    return this.http.get<Macros[]>(`${this.API_URL}/${item.fdc_id}/macros/`);
  }
}
