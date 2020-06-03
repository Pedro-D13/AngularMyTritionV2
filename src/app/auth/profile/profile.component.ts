import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticateService } from "../authenticate.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  snackBarWelcome;
  data;
  constructor(
    private snackBar: MatSnackBar,
    private http: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.snackBar.open("Welcome man so glad you could join us", "X", {
      duration: 2500,
    });
    this.data = this.http.getProfileData();
  }
}
