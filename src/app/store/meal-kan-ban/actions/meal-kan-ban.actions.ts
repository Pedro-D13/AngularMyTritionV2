import { createAction, props } from "@ngrx/store";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";

export const getFavFoodList = createAction(
  "[meal-kan-ban] get request for users favfoods"
);
export const getFavFoodListSuccess = createAction(
  "[meal-kan-ban]successfully retrieved the favfoodlist",
  props<{ payload: FavFoodList[] }>()
);
export const getFavFoodListFail = createAction(
  "[meal-kan-ban]Fail to retrieve the favfoodlist ",
  props<{ payload: string }>()
);

export const saveMealPlan = createAction(
  "[meal-kan-ban] save the current list in the meal plan",
  props<{ payload: FavFoodList[] }>()
);

export const saveFavouritesList = createAction(
  "[meal-kan-ban] save the Fav list",
  props<{ payload: FavFoodList[] }>()
);

export const clearMealPlan = createAction(
  "[meal-kan-ban] reset the current list in the meal plan",
  props<{ payload: FavFoodList[] }>()
);
