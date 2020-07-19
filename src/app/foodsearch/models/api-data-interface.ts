export interface CategoryList {
  fdc_id: number;
  branded_food_category: string;
}

export interface CategoryItem {
  fdc_id: number;
  description: string;
  food_category_id: number;
}

export interface Macros {
  name: string;
  amount: number;
  unit_name: string;
}

export interface nutrient {
  name: string;
  value: number;
}

export interface FavFoodList {
  description: string;
  fdc_id: number;
  nutr_vals?: Macros[];
}
