import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CategoryItem, Macros } from "../models/api-data-interface";
import { BackendCallsService } from "src/app/foodsearch/servicesFolder/backend-calls.service";
import { PlanmealsService } from "../servicesFolder/planmeals.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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

  // favourite
  foodItem;

  @Input("categoryList$") categoryList$;

  @Input("description") description;

  @Input("success") success;

  constructor(
    private bcs: BackendCallsService,
    private meals: PlanmealsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getCategoryItems(category) {
    this.currentListSelection = category;
    this.itemLoading = true;
    this.categoryItems$ = this.bcs
      .getCategoryItems(this.description, category)
      .pipe(
        tap((_) => {
          this.itemLoading = false;
        })
      );
    setTimeout(() => {
      this.itemLoading = false;
    }, 3000);
  }

  getMacros(item) {
    this.foodItem = item;
    this.currentItemSelection = item.description;
    this.macroLoading = true;
    try {
      this.macros$ = this.bcs.getMacros(item).pipe(
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

  favFood(fdc_id) {
    const response = this.meals.postPlanMealsData(fdc_id);
    response.subscribe();
    // this.added();
  }

  added() {
    this.snackBar.open(`${this.foodItem.description} successfully added`, "X", {
      duration: 3000,
    });
  }
}
