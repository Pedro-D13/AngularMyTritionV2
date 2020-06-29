import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

import { PlanmealsService } from "../servicesFolder/planmeals.service";
import { Observable, from, Subscription } from "rxjs";
import { FavFoodList } from "../models/api-data-interface";
import { pluck, map } from "rxjs/operators";

// State Management
import { Store, select } from "@ngrx/store";
import * as mealKanBanActions from "../../store/meal-kan-ban/actions/meal-kan-ban.actions";

import { KanBanState } from "src/app/store/meal-kan-ban/reducers/meal-kan-ban.reducers";

@Component({
  selector: "app-meal-kan-ban",
  templateUrl: "./meal-kan-ban.component.html",
  styleUrls: ["./meal-kan-ban.component.css"],
})
export class MealKanBanComponent implements OnInit, OnDestroy {
  state: Observable<KanBanState> = this.store.pipe(select("mealplan"));
  currState;
  // list of all favourite food items
  currList: FavFoodList[];
  // list of food items you will eat today
  mealPlan: FavFoodList[] = [];
  total: number = 0;

  private subs = new Subscription();
  // simply add the current state of the mealPlan and currentList which also goes up to the store

  constructor(
    private http: PlanmealsService,
    private store: Store<{ mealplan: any }>
  ) {
    this.subs.add(
      (this.currState = this.state
        .pipe(
          map((data) => {
            const newArr = data.list.filter((item) => {
              return !this.mealPlan.includes(item);
            });
            const mealplanArray = data.mealPlan;
            this.mealPlan = [...mealplanArray];
            this.currList = [...newArr];
          })
        )
        .subscribe())
    );
  }

  ngOnInit() {
    if (localStorage.getItem("state")) {
      // if condition is true get the store
      // this.store.dispatch(mealKanBanActions.rehydrateStateSuccess({}));
      this.state
        .pipe(
          map((data) => {
            this.mealPlan = [...data.mealPlan];
            this.currList = [...data.list];
          })
        )
        .subscribe();
    } else {
      // get the store from the saved state
      console.log("asking backend`");
      this.store.dispatch(mealKanBanActions.getFavFoodList());
    }
  }

  // on destructions save the current list of items in the mealplan and in favfood
  ngOnDestroy() {
    this.subs.add(
      this.store.dispatch(
        mealKanBanActions.saveMealPlan({ payload: this.mealPlan })
      )
    );
    this.subs.add(
      this.store.dispatch(
        mealKanBanActions.saveFavouritesList({ payload: this.currList })
      )
    );
    this.subs.unsubscribe();
  }

  calcMacrosFunc() {
    const calcMacros = from(this.mealPlan);
    this.total = 0;
    this.subs.add(
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
            this.total +
              " is the total amount of energy in the current meal plan"
          );
        })
    );
  }

  deleteFoodItem(item, index) {
    this.http.deletePlanMealsData(item.fdc_id).subscribe((data) => {
      if (index > -1) {
        this.currList.splice(index, 1);
      }
    });
  }

  deleteState() {
    localStorage.removeItem("state");
  }

  drop(event: CdkDragDrop<any>) {
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
    }
  }
}
