import { Action, createReducer, on } from "@ngrx/store";
import * as mealKanBanActions from "../actions/meal-kan-ban.actions";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";

export interface KanBanState {
  list: FavFoodList[];
  loading: boolean;
  loaded: boolean;
  mealPlan?: FavFoodList[];
  response?: string;
}

export const initialState: KanBanState = {
  list: [],
  loading: false,
  loaded: false,
  mealPlan: [],
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
  on(mealKanBanActions.saveMealPlan, (state, { payload }) => ({
    ...state,
    mealPlan: payload,
  })),
  on(mealKanBanActions.saveFavouritesList, (state, { payload }) => ({
    ...state,
    list: payload,
  })),
  on(mealKanBanActions.clearMealPlan, (state) => ({
    ...state,
    mealPlan: [],
  }))
);

export function reducer(state: KanBanState, action: Action) {
  return mealkanbanReduer(state, action);
}

export const mealkanbanFeatureKey = "mealplan";
