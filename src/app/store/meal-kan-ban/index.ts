import { createSelector, createFeatureSelector } from "@ngrx/store";

import { KanBanState } from "./reducers/meal-kan-ban.reducers";

export interface MealKanBanState {
  boardState: KanBanState;
}

export const selectMealKanBan = createFeatureSelector<MealKanBanState>(
  "boardState"
);

export const selectMealKanBanList = createSelector(
  selectMealKanBan,
  (state: MealKanBanState) => state.boardState
);
