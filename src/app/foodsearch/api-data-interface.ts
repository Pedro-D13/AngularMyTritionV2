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
  unit_name: string;
  amount: number;
}

export interface User {
  name: string;
  email: string;
  password1: string;
  password2: string;
}
