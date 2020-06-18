import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!!localStorage.getItem("token")) {
      return true;
    } else {
      this.snackBar.open("An account is needed to access this page", "login", {
        duration: 5000,
      });
      this.router.navigateByUrl("login");
      return false;
    }
  }
}
