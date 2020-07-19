import { Component, OnInit, OnChanges } from "@angular/core";
import { KanBanState } from "src/app/store/meal-kan-ban/reducers/meal-kan-ban.reducers";
import { Store, select } from "@ngrx/store";
import {
  FavFoodList,
  Macros,
} from "src/app/foodsearch/models/api-data-interface";
import { Observable, zip, of, from } from "rxjs";
import {
  map,
  mergeMap,
  tap,
  groupBy,
  toArray,
  filter,
  reduce,
  mergeAll,
  buffer,
  bufferCount,
} from "rxjs/operators";

@Component({
  selector: "app-nutrient-breakdown",
  templateUrl: "./nutrient-breakdown.component.html",
  styleUrls: ["./nutrient-breakdown.component.scss"],
})
export class NutrientBreakdownComponent implements OnInit, OnChanges {
  mealPlanState$: FavFoodList[];
  nutrVals$: Observable<[string, number]>;
  energy$: number;
  calculatedMacros: Array<[string, number]> = [];

  constructor(private store: Store<{ BoardState: KanBanState }>) {
    this.store
      .pipe(select("BoardState", "mealPlan"))
      .subscribe((data) => (this.mealPlanState$ = data));
  }
  ngOnChanges() {
    this.getMealPlanState();
  }

  ngOnInit(): void {
    this.getMealPlanState();
  }

  getMealPlanState() {
    from(this.mealPlanState$)
      .pipe(
        map((data: FavFoodList) => data),
        mergeMap((data) => data.nutr_vals),
        groupBy((macro) => macro.name),
        mergeMap((groups$) =>
          zip(
            of(groups$.key),
            groups$.pipe(
              reduce((acc, curr) => acc + Math.round(curr.amount), 0)
            )
          )
        ),
        bufferCount(5),
        map((data) => (this.calculatedMacros = data))
      )
      .subscribe();
  }
}
