import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CategoryItem, Macros } from "../api-data-interface";
import { BackendCallsService } from "src/app/foodsearch/servicesFolder/backend-calls.service";

@Component({
  selector: "app-category-list",
  templateUrl: "category-list.component.html",
  styleUrls: [],
})
export class CategoryListComponent implements OnInit {
  categoryItems$: Observable<CategoryItem[]>;
  macros$: Observable<Macros[]>;
  selectable = true;
  loading: boolean;
  itemLoading: boolean;
  macroLoading: boolean;

  // StepperControl
  categroyList;
  categoryItems;
  macros;

  // Chip titles
  currentListSelection;
  currentItemSelection;

  @Input("categoryList$") categoryList$;

  @Input("description") description;

  constructor(private bcs: BackendCallsService) {}

  ngOnInit(): void {}

  async getCategoryItems(category) {
    this.currentListSelection = category;
    this.itemLoading = true;
    try {
      this.categoryItems$ = await this.bcs
        .getCategoryItems(this.description, category)
        .pipe(
          tap((_) => {
            this.itemLoading = false;
          })
        );
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      this.itemLoading = false;
    }, 3000);
  }

  async getMacros(item) {
    this.currentItemSelection = item.description;
    this.macroLoading = true;
    try {
      this.macros$ = await this.bcs.getMacros(item).pipe(
        tap((_) => {
          this.macroLoading = false;
        })
      );
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      this.macroLoading = false;
    }, 3000);
  }
}
