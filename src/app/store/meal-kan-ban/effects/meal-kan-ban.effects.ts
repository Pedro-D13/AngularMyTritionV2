import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, mergeMap, tap, switchMap } from "rxjs/operators";

import { PlanmealsService } from "src/app/foodsearch/servicesFolder/planmeals.service";
import * as mealKanBanActions from "../actions/meal-kan-ban.actions";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";
import { loadstate, savestate, RehydrateState } from "../localstorage";

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

  rehydrateState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mealKanBanActions.rehydrateState),
      map(() => {
        const json = loadstate();
        return mealKanBanActions.rehydrateStateSuccess({
          MealPlan: json.MealPlan,
          SelectFrom: json.SelectFrom,
        });
      })
    )
  ).subscribe();

  loadFavFoodList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(mealKanBanActions.getFavFoodList),
      switchMap(() => {
        return this.http.getPlanMealsData().pipe(
          map((data: FavFoodList[]) => {
            return mealKanBanActions.getFavFoodListSuccess({
              payload: [...data],
            });
          }),
          catchError(() => console.error)
        );
      })
    )
  );
}
