import * as fromMealKanBan from "../actions/meal-kan-ban.actions";
import { FavFoodList } from "../../models/api-data-interface";
import { from } from "rxjs";

export interface FavFoodListState {
  data: FavFoodList[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: FavFoodListState = {
  data: [
    {
      description:
        "FOOD CLUB, RICE & SAUCE, CHEDDAR BROCCOLI, RICE AND PASTA IN A CHEESE SAUCE WITH BROCCOLI",
      fdc_id: 361781,
      nutr_vals: [
        {
          name: "Protein",
          amount: 10.29,
          unit_name: "G",
        },
        {
          name: "Total lipid (fat)",
          amount: 2.21,
          unit_name: "G",
        },
        {
          name: "Carbohydrate, by difference",
          amount: 75.0,
          unit_name: "G",
        },
        {
          name: "Energy",
          amount: 368.0,
          unit_name: "KCAL",
        },
        {
          name: "Sugars, total including NLEA",
          amount: 2.94,
          unit_name: "G",
        },
      ],
    },
    {
      description: "BROCCOLI & CHEESE RICE MIX",
      fdc_id: 598333,
      nutr_vals: [
        {
          name: "Protein",
          amount: 9.52,
          unit_name: "G",
        },
        {
          name: "Total lipid (fat)",
          amount: 3.97,
          unit_name: "G",
        },
        {
          name: "Carbohydrate, by difference",
          amount: 73.02,
          unit_name: "G",
        },
        {
          name: "Energy",
          amount: 365.0,
          unit_name: "KCAL",
        },
        {
          name: "Sugars, total including NLEA",
          amount: 4.76,
          unit_name: "G",
        },
      ],
    },
  ],
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromMealKanBan.FavFoodAction
): FavFoodListState {
  switch (action.type) {
    case fromMealKanBan.LOAD_FAVFOODLIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromMealKanBan.LOAD_FAVFOODLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case fromMealKanBan.LOAD_FAVFOODLIST_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    default:
      return state;
  }
}

export const getFavFoodListLoading = (state: FavFoodListState) => state.loading;
export const getFavFoodListLoaded = (state: FavFoodListState) => state.loaded;
export const getFavFoodList = (state: FavFoodListState) => state.data;
