import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, EMPTY, merge, concat } from "rxjs";
import {
  map,
  catchError,
  switchMap,
  mergeMap,
  exhaustMap,
  tap,
  concatMap,
} from "rxjs/operators";

import { PlanmealsService } from "src/app/foodsearch/servicesFolder/planmeals.service";
import * as mealKanBanActions from "../actions/meal-kan-ban.actions";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";
import { loadstate, savestate } from "../localstorage";

@Injectable()
export class MealKanBanEffects {
  constructor(private actions$: Actions, private http: PlanmealsService) {}

  saveMealPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mealKanBanActions.saveMealPlan),
      tap((data) => {
        return savestate(data);
      })
    )
  ).subscribe();

  loadFavFoodList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mealKanBanActions.getFavFoodList),
      mergeMap(() => {
        return this.http.getPlanMealsData().pipe(
          map((data: FavFoodList[]) =>
            mealKanBanActions.getFavFoodListSuccess({
              payload: data,
            })
          ),
          catchError(() => console.error)
        );
      })
    )
  );
}
