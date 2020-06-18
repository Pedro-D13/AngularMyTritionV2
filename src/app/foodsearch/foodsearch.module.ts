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
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";

const modules = [
  CommonModule,
  SharedModule,
  StoreModule.forFeature("FavFood", reducers),
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
  imports: [...modules, DragDropModule],
  exports: [...components],
  bootstrap: [SearchboxComponent],
})
export class FoodsearchModule {}
