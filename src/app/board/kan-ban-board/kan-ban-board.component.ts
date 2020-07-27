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
  SelectFrom: FavFoodList[] = [];
  MealPlan: FavFoodList[] = [];

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

  delete(item: FavFoodList, index) {
    if (index > -1) {
      this.SelectFrom.splice(index, 1);
    }
    this.store.dispatch(
      kanBanActions.RemoveFoodItem({
        itemToBeRemoved: item.fdc_id,
        newFavFoodList: this.SelectFrom,
        MealPlan: this.MealPlan,
      })
    );
  }

  // deleteFoodItem(item, index) {
  //   this.http.deletePlanMealsData(item.fdc_id).subscribe((data) => {
  //     if (index > -1) {
  //       this.currList.splice(index, 1);
  //     }
  //   });
  // }
}
