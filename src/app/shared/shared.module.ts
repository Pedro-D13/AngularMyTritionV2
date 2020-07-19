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
import { HttpClientModule } from "@angular/common/http";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ErrorComponent } from "./error/error.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { RouterModule } from "@angular/router";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatTableModule } from "@angular/material/table";

const components = [ErrorComponent, MainNavComponent];
const modules = [
  CommonModule,
  HttpClientModule,
  MatStepperModule,
  MatFormFieldModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSnackBarModule,
  RouterModule,
  DragDropModule,
];

@NgModule({
  imports: [...modules],
  declarations: [...components],
  exports: [...components, ...modules],
})
export class SharedModule {}
