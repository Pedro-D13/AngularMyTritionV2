import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";

import { KanBanBoardComponent } from "./kan-ban-board/kan-ban-board.component";
import { NutrientBreakdownComponent } from './nutrient-breakdown/nutrient-breakdown.component';

const components = [KanBanBoardComponent];
const modules = [SharedModule];

@NgModule({
  imports: [...modules],
  declarations: [...components, NutrientBreakdownComponent],
  exports: [...components, ...modules],
})
export class KanBanBoardModule {}
