import { Component, OnInit } from "@angular/core";

import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
  successMessage$;
  constructor(
    private http: AuthenticateService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.logOutMessage();
  }
  logOutMessage() {
    if (localStorage.getItem("token")) {
      this.snackBar.open("Logged out", "X", {
        duration: 2500,
      });
      this.successMessage$ = this.http.logout();
    } else {
      this.snackBar.open("sign in to sign out :)", "X", {
        duration: 2500,
      });
    }
    this.router.navigateByUrl("login");
  }
}
