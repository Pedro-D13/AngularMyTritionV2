// modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

// components

import { CategoryListComponent } from "./category-list/category-list.component";

import { HighlightDirective } from "../highlight.directive";
import { SearchboxComponent } from "./searchbox/searchbox.component";
import { StepperDirective } from "../stepper.directive";

const modules = [CommonModule, SharedModule];

const components = [SearchboxComponent, CategoryListComponent];

@NgModule({
  declarations: [...components, HighlightDirective, StepperDirective],
  imports: [...modules],
  exports: [...components],
  bootstrap: [SearchboxComponent],
})
export class FoodsearchModule {}
