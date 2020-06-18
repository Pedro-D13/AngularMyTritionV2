import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PlanmealsService } from "src/app/foodsearch/servicesFolder/planmeals.service";
import { map, tap, toArray } from "rxjs/operators";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  data$;
  newList = [];
  constructor(private snackBar: MatSnackBar, private http: PlanmealsService) {}

  ngOnInit(): void {
    this.data$ = this.http.getPlanMealsData();
    this.snackBar.open("Welcome so glad you could join us", "X", {
      duration: 2500,
    });
  }
}
