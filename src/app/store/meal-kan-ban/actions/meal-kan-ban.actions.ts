import { createAction, props } from "@ngrx/store";
import {
  FavFoodList,
  Macros,
} from "src/app/foodsearch/models/api-data-interface";

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
  props<{ SelectFrom: FavFoodList[]; MealPlan: FavFoodList[] }>()
);
export const saveMealPlanSuccess = createAction(
  "[meal-kan-ban] Meal Plan Successfully saved"
);
export const rehydrateState = createAction(
  "[meal-kan-ban] rehydrate the current state"
);
export const rehydrateStateSuccess = createAction(
  "[meal-kan-ban] State rehydrate, JSON Object recovered from state",
  props<{ SelectFrom: FavFoodList[]; MealPlan: FavFoodList[] }>()
);

export const MealPlanUpdate = createAction(
  "[meal-kan-ban] Change detected in the MealPlan",
  props<{ SelectFrom: FavFoodList[]; MealPlan: FavFoodList[] }>()
);

export const RemoveFoodItem = createAction(
  "[meal-kan-ban] delete food item from FavFoodList",
  props<{
    itemToBeRemoved: number;
    newFavFoodList: FavFoodList[];
    MealPlan: FavFoodList[];
  }>()
);
