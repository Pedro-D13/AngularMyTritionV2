// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

// components
import { CategoryListComponent } from "./category-list/category-list.component";

import { HighlightDirective } from "../highlight.directive";
import { SearchboxComponent } from "./searchbox/searchbox.component";
import { StepperDirective } from "../stepper.directive";
import { PlanmealsComponent } from "./planmeals/planmeals.component";
import { MealKanBanComponent } from "./meal-kan-ban/meal-kan-ban.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { StoreModule, Store } from "@ngrx/store";
import * as fromMealKanBan from "../store/meal-kan-ban/reducers/meal-kan-ban.reducers";
import { EffectsModule } from "@ngrx/effects";
import { MealKanBanEffects } from "../store/meal-kan-ban/effects/meal-kan-ban.effects";

const modules = [
  CommonModule,
  SharedModule,
  DragDropModule,
  StoreModule.forFeature(
    fromMealKanBan.mealkanbanFeatureKey,
    fromMealKanBan.reducer
  ),
];

const components = [
  SearchboxComponent,
  CategoryListComponent,
  PlanmealsComponent,
  HighlightDirective,
  StepperDirective,
  MealKanBanComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
  bootstrap: [SearchboxComponent],
})
export class FoodsearchModule {}
