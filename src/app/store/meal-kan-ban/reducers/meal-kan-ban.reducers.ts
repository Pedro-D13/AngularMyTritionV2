import { Action, createReducer, on } from "@ngrx/store";
import * as mealKanBanActions from "../actions/meal-kan-ban.actions";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";
import { state } from "@angular/animations";

export interface KanBanState {
  list: FavFoodList[];
  mealPlan?: FavFoodList[];
  loading: boolean;
  loaded: boolean;
  response?: string;
}

export const initialState: KanBanState = {
  list: new Array(),
  loading: false,
  loaded: false,
  mealPlan: new Array(),
};

const mealkanbanReduer = createReducer(
  initialState,
  on(mealKanBanActions.getFavFoodList, (state) => ({
    ...state,
    loading: true,
  })),

  on(mealKanBanActions.getFavFoodListSuccess, (state, { payload }) => ({
    ...state,
    list: payload,
    loading: false,
    loaded: true,
  })),
  on(mealKanBanActions.getFavFoodListFail, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    response: payload,
  })),
  on(mealKanBanActions.saveMealPlan, (state) => ({
    ...state,
  })),
  on(mealKanBanActions.saveMealPlanSuccess, (state) => ({
    ...state,
  })),
  on(mealKanBanActions.rehydrateState, (state) => ({
    ...state,
  })),
  on(
    mealKanBanActions.rehydrateStateSuccess,
    (state, { SelectFrom, MealPlan }) => ({
      ...state,
      list: SelectFrom,
      mealPlan: MealPlan,
    })
  ),
  on(mealKanBanActions.MealPlanUpdate, (state, { SelectFrom, MealPlan }) => ({
    ...state,
    list: SelectFrom,
    mealPlan: MealPlan,
  })),
  on(mealKanBanActions.RemoveFoodItem, (state, { newFavFoodList }) => ({
    ...state,
    list: newFavFoodList,
  }))
);

export function reducer(state: KanBanState, action: Action) {
  return mealkanbanReduer(state, action);
}

export const mealkanbanFeatureKey = "Mealplan";
