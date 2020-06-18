import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { publish, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CategoryList } from "../models/api-data-interface";

import { BackendCallsService } from "../servicesFolder/backend-calls.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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

  constructor(
    private bcs: BackendCallsService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchBoxForm = this.fb.group({
      description: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  get descriptionVal(): string {
    this.description = this.searchBoxForm.get("description").value;
    return this.description;
  }

  CategoryList() {
    this.clearCurrentResults();
    this.loading = true;
    this.success = null;
    this.categoryList$ = this.bcs.getCategoryList(this.descriptionVal);
    this.categoryList$.subscribe(
      (next) => {
        this.loadingFin();
        this.success = true;
      },
      (err) => {
        this.clearCurrentResults();
        this.loadingFin();
        this.success = false;
        this.snackBar.open(`${err.error}:${this.descriptionVal}`, "X", {
          duration: 2000,
        });
      }
    );
    setTimeout(() => {
      this.loadingFin();
    }, 6000);
  }

  clearCurrentResults() {
    this.categoryList$ = null;
  }

  loadingFin() {
    this.loading = false;
  }
}
