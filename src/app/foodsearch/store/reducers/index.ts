import * as fromMealKanban from "../reducers/meal-kan-ban.reducers";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

// keep all of the reducers for the foodsearch module

export interface FoodSearchState {
  FavFood: fromMealKanban.FavFoodListState;
}

export const reducers: ActionReducerMap<FoodSearchState> = {
  FavFood: fromMealKanban.reducer,
};
export const getFavFoodListState = createFeatureSelector<FoodSearchState>(
  "FavFood"
);

// the favfood list state

export const getFavFoodState = createSelector(
  getFavFoodListState,
  (state: FoodSearchState) => state.FavFood
);

export const getAllFavFoodlist = createSelector(
  getFavFoodState,
  fromMealKanban.getFavFoodList
);
export const getAllFavFoodlistLoaded = createSelector(
  getFavFoodState,
  fromMealKanban.getFavFoodListLoaded
);
export const getAllFavFoodlistLoading = createSelector(
  getFavFoodState,
  fromMealKanban.getFavFoodListLoading
);
