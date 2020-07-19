// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

// components
import { CategoryListComponent } from "./category-list/category-list.component";

import { HighlightDirective } from "../highlight.directive";
import { SearchboxComponent } from "./searchbox/searchbox.component";
import { StepperDirective } from "../stepper.directive";

import { StoreModule } from "@ngrx/store";
import * as fromMealKanBan from "../store/meal-kan-ban/reducers/meal-kan-ban.reducers";

const modules = [
  CommonModule,
  SharedModule,
  StoreModule.forFeature(
    fromMealKanBan.mealkanbanFeatureKey,
    fromMealKanBan.reducer
  ),
];

const components = [
  SearchboxComponent,
  CategoryListComponent,
  HighlightDirective,
  StepperDirective,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  bootstrap: [SearchboxComponent],
})
export class FoodsearchModule {}
