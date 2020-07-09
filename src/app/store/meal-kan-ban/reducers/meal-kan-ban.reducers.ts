import { Action, createReducer, on } from "@ngrx/store";
import * as mealKanBanActions from "../actions/meal-kan-ban.actions";
import { FavFoodList } from "src/app/foodsearch/models/api-data-interface";
import { state } from "@angular/animations";
import { loadstate, savestate } from "../localstorage";

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
  on(mealKanBanActions.saveMealPlan, (state, { SelectFrom, MealPlan }) => ({
    ...state,
    list: SelectFrom,
    mealPlan: MealPlan,
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
  on(mealKanBanActions.clearMealPlan, (state) => ({
    ...state,
    mealPlan: [],
  })),
  on(mealKanBanActions.calculateEnergy, (state) => ({
    ...state,
  }))
);

export function reducer(state: KanBanState, action: Action) {
  return mealkanbanReduer(state, action);
}

export const mealkanbanFeatureKey = "Mealplan";
