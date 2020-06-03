import { Directive, Input, HostListener } from "@angular/core";
import { MatStepper } from "@angular/material/stepper";

@Directive({
  selector: "[appStepper]",
})
export class StepperDirective {
  constructor(private stepper: MatStepper) {}

  @HostListener("onclick") next() {
    this.stepper.next();
  }
}
