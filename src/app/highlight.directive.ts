import { Directive, HostListener } from "@angular/core";
import { MatChip } from "@angular/material/chips";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private chip: MatChip) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.chip.select();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.chip.deselect();
  }

  @HostListener("onclick") onclick() {
    this.chip.focus();
    this.chip.color = "accent";
    this.chip.select();
  }
  // private highlight(bool: boolean) {

  //   this.el.nativeElement.chip.selected = true;
  // }
}
