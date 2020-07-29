import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, of, iif, merge } from "rxjs";
import { map, shareReplay, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.css"],
})
export class MainNavComponent {
  authenticated = false;

  authenticatedCheck = of(localStorage.getItem("token")).subscribe((data) => {
    if (data !== null) {
      this.authenticated = true;
      console.log(true);
    } else {
      this.authenticated = false;
      console.log(false);
    }
  });

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait, Breakpoints.XSmall])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe([
      Breakpoints.Web,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
