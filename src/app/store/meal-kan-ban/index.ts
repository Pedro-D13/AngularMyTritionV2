import { createSelector } from "@ngrx/store";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";

export interface MealKanBanState {
  list: FavFoodList[];
}

export interface AppState {
  mealkanban: MealKanBanState;
}

export const selectMealKanBan = (state: AppState) => state.mealkanban;

export const selectMealKanBanList = createSelector(
  selectMealKanBan,
  (state: MealKanBanState) => state.list
);
