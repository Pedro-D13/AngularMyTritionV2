import { Observable, from, iif, of, concat } from "rxjs";

import { Store, select } from "@ngrx/store";
import { Component, OnInit, OnDestroy } from "@angular/core";

import * as kanBanActions from "../../store/meal-kan-ban/actions/meal-kan-ban.actions";
import { KanBanState } from "src/app/store/meal-kan-ban/reducers/meal-kan-ban.reducers";
import { map, shareReplay } from "rxjs/operators";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";

@Component({
  selector: "app-kan-ban-board",
  templateUrl: "./kan-ban-board.component.html",
  styleUrls: ["./kan-ban-board.component.css"],
})
export class KanBanBoardComponent implements OnInit, OnDestroy {
  // An observable of Fav Food list retrieved from a back end call
  FavFood$: Observable<FavFoodList[]>;

  // the lists used for the kan ban features
  SelectFrom: FavFoodList[];
  MealPlan: FavFoodList[] = [];

  totalEnergy$ = 0;
  totalProtein$ = 0;
  totalCarbs$ = 0;
  totalFats$ = 0;
  totalSugars$ = 0;

  // retrieves state from the store, KanBanState
  constructor(private store: Store<{ Mealplan: KanBanState }>) {
    // pipes the selected state and allows you to select different data from it. i.e. list,loading,mealplan etc
  }

  ngOnInit(): void {
    // checks to see if there is a saved state
    if (localStorage.getItem("state")) {
      // if saved state rehydrate saved state
      this.store.dispatch(kanBanActions.rehydrateState());
    } else {
      this.store.dispatch(kanBanActions.getFavFoodList());
    }
    this.loadLists();
    // on initialization it will request the logged in users Fav Food list
  }

  ngOnDestroy() {
    //  if nothing has been transfered over to the meal plan no need to save it?
    if (this.MealPlan.length > 0) {
      this.store.dispatch(
        kanBanActions.saveMealPlan({
          SelectFrom: this.SelectFrom,
          MealPlan: this.MealPlan,
        })
      );
    } else {
      this.store.dispatch(
        kanBanActions.saveMealPlan({
          SelectFrom: this.SelectFrom,
          MealPlan: [],
        })
      );
    }
  }

  private loadLists() {
    this.FavFood$ = this.store.pipe(
      select("Mealplan"),
      map(
        (data) => (
          (this.SelectFrom = [...data.list]),
          (this.MealPlan = [...data.mealPlan])
        ),
        shareReplay()
      )
    );
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.store.dispatch(
      kanBanActions.MealPlanUpdate({
        SelectFrom: this.SelectFrom,
        MealPlan: this.MealPlan,
      })
    );
    this.store.dispatch(
      kanBanActions.saveMealPlan({
        SelectFrom: this.SelectFrom,
        MealPlan: this.MealPlan,
      })
    );
  }
}

// macrosGroup(nutrName) {
//   // this should be a subject
//   return from(this.MealPlan).pipe(
//     pluck("nutr_vals"),
//     map((data) => {
//       let num = 0;
//       data.forEach((ele) => {
//         // inputs the name of the nutr
//         if (ele.name === `${nutrName}`) {
//           num = ele.amount;
//         }
//       });
//       return num;
//     }),
//     reduce((acc, val) => acc + val)
//   );
// }

// these should be observing from a subject
// getMacro() {
//   this.macrosGroup("Energy").subscribe(
//     (x) => (this.totalEnergy$ = Math.round(x))
//   );
//   this.macrosGroup("Protein").subscribe(
//     (x) => (this.totalProtein$ = Math.round(x))
//   );
//   this.macrosGroup("Sugars").subscribe(
//     (x) => (this.totalSugars$ = Math.round(x))
//   );
//   this.macrosGroup("Total lipid (fat)").subscribe(
//     (x) => (this.totalFats$ = Math.round(x))
//   );
//   this.macrosGroup("Carbohydrate, by difference").subscribe(
//     (x) => (this.totalCarbs$ = Math.round(x))
//   );
// }

// deleteFoodItem(item, index) {
//   this.http.deletePlanMealsData(item.fdc_id).subscribe((data) => {
//     if (index > -1) {
//       this.currList.splice(index, 1);
//     }
//   });
// }}
