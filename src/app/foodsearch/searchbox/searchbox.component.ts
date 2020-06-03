import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { publish, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CategoryList } from "../api-data-interface";

import { BackendCallsService } from "../servicesFolder/backend-calls.service";

@Component({
  selector: "app-searchbox",
  templateUrl: "searchbox.component.html",
  styleUrls: ["searchbox.component.css"],
})
export class SearchboxComponent implements OnInit {
  searchBoxForm: FormGroup;
  success: boolean;
  loading: boolean;
  categoryList$: Observable<CategoryList[]>;
  description: string;
  checked = false;

  constructor(private bcs: BackendCallsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchBoxForm = this.fb.group({
      description: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  get descriptionVal(): string {
    this.description = this.searchBoxForm.get("description").value;
    return this.description;
  }

  async CategoryList() {
    this.clearCurrentResults();
    this.loading = true;
    try {
      this.categoryList$ = await this.bcs.getCategoryList(this.descriptionVal);
      this.categoryList$.pipe(
        tap((_) => {
          this.loading = false;
        })
      );
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
    // fall back if request takes longer than 5 seconds,
    setTimeout(() => {
      this.loading = false;
    }, 3300);
  }

  clearCurrentResults() {
    this.categoryList$ = null;
  }
}
