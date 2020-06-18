import { Action } from "@ngrx/store";
import { FavFoodList } from "../../models/api-data-interface";
import { PlanmealsService } from "../../servicesFolder/planmeals.service";

export const LOAD_FAVFOODLIST = "[Meal-Kan-Ban] load Fav Food list";
export const LOAD_FAVFOODLIST_FAIL = "[Meal-Kan-Ban] load Fav Food Fail";
export const LOAD_FAVFOODLIST_SUCCESS = "[Meal-Kan-Ban] load Fav Food success";

export class LoadFavFoodList implements Action {
  readonly type = LOAD_FAVFOODLIST;
}

export class LoadFavFoodListFail implements Action {
  readonly type = LOAD_FAVFOODLIST_FAIL;
  constructor(public payload: any) {}
}

export class LoadFavFoodListSuccess implements Action {
  readonly type = LOAD_FAVFOODLIST_SUCCESS;
  constructor(public payload: FavFoodList[]) {}
}

// action types
export type FavFoodAction =
  | LoadFavFoodList
  | LoadFavFoodListFail
  | LoadFavFoodListSuccess;
