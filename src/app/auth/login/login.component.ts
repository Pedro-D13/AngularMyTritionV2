import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticateService } from "../authenticate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  // set an interface/type for the webtoken
  loginResponse$;
  webtoken;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["testuser13", Validators.minLength(6)],
      password: ["bY4LAn87jSN7", Validators.minLength(6)],
    });
  }

  get usernameDetails() {
    return this.loginForm.get("username").value;
  }

  get passwordDetails() {
    return this.loginForm.get("password").value;
  }

  public loginUser() {
    const data = {
      username: this.usernameDetails,
      password: this.passwordDetails,
    };
    this.loginResponse$ = this.auth.loginUser(data);
    this.loginResponse$.subscribe((data) => {
      localStorage.setItem("token", data["auth_token"]);
      this.router.navigateByUrl("profile");
    });
  }
}
