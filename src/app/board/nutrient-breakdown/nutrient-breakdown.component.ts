import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  DoCheck,
} from "@angular/core";
import { KanBanState } from "src/app/store/meal-kan-ban/reducers/meal-kan-ban.reducers";
import { Store, select } from "@ngrx/store";
import {
  FavFoodList,
  Macros,
} from "src/app/foodsearch/models/api-data-interface";
import {
  Observable,
  zip,
  of,
  from,
  Subscription,
  interval,
  merge,
  GroupedObservable,
  pipe,
} from "rxjs";
import {
  map,
  mergeMap,
  groupBy,
  reduce,
  shareReplay,
  concatMap,
  filter,
  mergeAll,
  concatAll,
  combineAll,
  toArray,
} from "rxjs/operators";
import { group } from "@angular/animations";

@Component({
  selector: "app-nutrient-breakdown",
  templateUrl: "./nutrient-breakdown.component.html",
  styleUrls: ["./nutrient-breakdown.component.scss"],
})
export class NutrientBreakdownComponent implements OnInit, OnDestroy {
  mealPlanState$: FavFoodList[];
  sub: Subscription;
  lengthOfList: 0;
  nutrVals$;
  storeSubScription$: FavFoodList[];
  calculatedMacros: Array<[string, number]> = [];

  // totalEnergy$ = { unit: "KCAL", total: 0, guideLines: 2500 };
  // totalProtein$ = { unit: "g", total: 0, guideLines: 56 };
  // totalCarbs$ = { unit: "g", total: 0, guideLines: 275 };
  // totalFats$ = { unit: "g", total: 0, guideLines: 78 };
  // totalSugars = { unit: "g", total: 0, guideLines: 40 };

  breakDown: Observable<[string, number, string] | [string, number, string][]>;

  constructor(private store: Store<{ BoardState: KanBanState }>) {}

  ngOnInit(): void {
    this.sub = this.store
      .pipe(select("BoardState", "mealPlan"), shareReplay())
      .subscribe((x) => {
        this.storeSubScription$ = x;
        this.macro();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getGuideLine(name: string) {
    switch (name) {
      case "Protein":
        return 56;
      case "Total lipid (fat)":
        return 78;
      case "Carbohydrate, by difference":
        return 275;
      case "Energy":
        return 2500;
      case "Sugars, total including NLEA":
        return 200;
    }
  }

  macro() {
    this.breakDown = of(this.storeSubScription$).pipe(
      mergeMap((data) => data),
      concatMap((data) => data.nutr_vals),
      groupBy((data) => data.name),
      mergeMap((groups$) =>
        zip(
          of(groups$.key),
          groups$.pipe(
            reduce(
              (acc: 0, curr) =>
                acc + Math.round(parseFloat(curr.amount.toFixed(2))),
              0 //seed
            )
          ),
          groups$.pipe(map((data) => data.unit_name))
        )
      ),
      toArray(),
      shareReplay()
    );
  }
}
