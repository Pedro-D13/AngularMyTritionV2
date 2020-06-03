import { Component, OnInit } from "@angular/core";

import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"],
})
export class LogoutComponent implements OnInit {
  successMessage$;
  constructor(private http: AuthenticateService, private router: Router) {}

  ngOnInit(): void {
    this.successMessage$ = this.http.logout();
    setTimeout(() => {
      this.router.navigateByUrl("");
    }, 1000);
  }
}
