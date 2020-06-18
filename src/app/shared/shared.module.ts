import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// angular forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// from angular material
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from "@angular/material/list";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";

const components = [];
const modules = [
  CommonModule,
  MatCheckboxModule,
  HttpClientModule,
  MatStepperModule,
  MatFormFieldModule,
  MatListModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatInputModule,
  MatProgressBarModule,
  FormsModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  MatIconModule,
];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  exports: [...components, ...modules],
})
export class SharedModule {}
