import { Component, OnInit } from "@angular/core";
import { AuthenticateService } from "../../auth/authenticate.service";
import { PlanmealsService } from "../servicesFolder/planmeals.service";
import { Observable } from "rxjs";
import { FavFoodList } from "../models/api-data-interface";

@Component({
  selector: "app-planmeals",
  templateUrl: "./planmeals.component.html",
  styleUrls: ["./planmeals.component.css"],
})
export class PlanmealsComponent implements OnInit {
  favList$: Observable<FavFoodList[]>;

  constructor(private http: PlanmealsService) {}

  ngOnInit(): void {
    this.favList$ = this.http.getPlanMealsData();
  }
}
