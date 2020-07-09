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

export const rehydrateState = createAction(
  "[meal-kan-ban] rehydrate the current state"
);

export const rehydrateStateSuccess = createAction(
  "[meal-kan-ban] State rehydrate, JSON Object recovered from state",
  props<{ SelectFrom: FavFoodList[]; MealPlan: FavFoodList[] }>()
);
export const clearMealPlan = createAction(
  "[meal-kan-ban] reset the current list in the meal plan",
  props<{ payload: FavFoodList[] }>()
);

export const calculateEnergy = createAction(
  "[meal-kan-ban] Calculate the total Energy in the meal plan",
  props<{ Macros: Macros[] }>()
);
