import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

import { PlanmealsService } from "../servicesFolder/planmeals.service";
import { Observable, of, from } from "rxjs";
import { FavFoodList } from "../models/api-data-interface";
import { pluck, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromStore from "../store";
import { FoodSearchState } from "../store";
import { FavFoodAction } from "../store/actions/meal-kan-ban.actions";

@Component({
  selector: "app-meal-kan-ban",
  templateUrl: "./meal-kan-ban.component.html",
  styleUrls: ["./meal-kan-ban.component.css"],
})
export class MealKanBanComponent implements OnInit {
  favList$: Observable<FavFoodList[]>;

  // list of all favourite food items
  currList = [];
  // list of food items you will eat today
  mealPlan = [];
  total: number = 0;

  constructor(
    private http: PlanmealsService,
    private store: Store<fromStore.FoodSearchState>
  ) {}

  ngOnInit() {
    this.favList$ = this.store.select(fromStore.getAllFavFoodlist);
    this.favList$.subscribe((data) => {
      data.forEach((ele) => {
        this.currList.push(ele);
      });
    });
  }

  getProfile() {
    this.favList$ = this.http.getPlanMealsData();
    this.favList$.subscribe((data) => {
      data.forEach((ele) => {
        this.currList.push(ele);
      });
    });
  }

  calcMacrosFunc() {
    const calcMacros = from(this.mealPlan);
    this.total = 0;
    calcMacros
      .pipe(
        pluck("nutr_vals"),
        // gets a list of nutr_vals which consist of the names amount and units of the macros
        map((val) => {
          val.forEach((element) => {
            // for each of the (usually 5) macros we want retrieve the energy macro
            if (element.name == "Energy") {
              return element.amount;
            }
          });
        })
      )
      .subscribe((data) => {
        console.log(
          this.total + " is the total amount of energy in the current meal plan"
        );
      });
  }

  deleteFoodItem(item, index) {
    this.http.deletePlanMealsData(item.fdc_id).subscribe((data) => {
      if (index > -1) {
        this.currList.splice(index, 1);
      }
    });
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // this.calcMacrosFunc();
    }
  }
}
