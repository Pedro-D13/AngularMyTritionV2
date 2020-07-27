import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, act } from "@ngrx/effects";
import { map, catchError, mergeMap, tap, switchMap } from "rxjs/operators";

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
      tap(({ SelectFrom, MealPlan }) => savestate({ SelectFrom, MealPlan })),
      map(() => {
        return mealKanBanActions.saveMealPlanSuccess();
      })
    )
  );

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
  );

  deleteFavFoodItem = createEffect(() =>
    this.actions$.pipe(
      ofType(mealKanBanActions.RemoveFoodItem),
      switchMap((action) => {
        return this.http.deletePlanMealsData(action.itemToBeRemoved).pipe(
          map((data) =>
            mealKanBanActions.MealPlanUpdate({
              SelectFrom: action.newFavFoodList,
              MealPlan: action.MealPlan,
            })
          )
        );
      })
    )
  );

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
