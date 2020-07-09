// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

// components
import { CategoryListComponent } from "./category-list/category-list.component";

import { HighlightDirective } from "../highlight.directive";
import { SearchboxComponent } from "./searchbox/searchbox.component";
import { StepperDirective } from "../stepper.directive";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { StoreModule } from "@ngrx/store";
import * as fromMealKanBan from "../store/meal-kan-ban/reducers/meal-kan-ban.reducers";
import { KanBanBoardComponent } from "./kan-ban-board/kan-ban-board.component";

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
  KanBanBoardComponent,
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
