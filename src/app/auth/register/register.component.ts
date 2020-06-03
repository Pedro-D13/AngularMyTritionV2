import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {} from "@angular/common/http";

import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  loading: boolean;
  registeredUserResponse$;
  errResponse$;
  errList = [];

  // readonly regexPattern = `^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$`;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticateService,
    private router: Router,
    private snackBar: MatSnackBar // simple service that takes in a loader and a router(turns on the loader and routes)
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ["madeupname", [Validators.required, Validators.minLength(6)]],
      password1: [
        "securepassword123",
        [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(this.regexPattern),
        ],
      ],
      password2: [
        "securepassword123",
        [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(this.regexPattern),
        ],
      ],
      email: ["p.afonsosd1994@gmail.com", Validators.required],
    });
  }

  get emailData() {
    return this.registrationForm.get("email").value;
  }

  get passwordData() {
    return this.registrationForm.get("password1").value;
  }

  get password2Data() {
    return this.registrationForm.get("password2").value;
  }

  get usernameData() {
    return this.registrationForm.get("username").value;
  }

  public postReg() {
    // this is an issue because you are sendin data over the internet without the password being encrpyted, look into a fix for this
    this.errList = [];

    const payload = {
      username: this.usernameData,
      password: this.passwordData,
      email: this.emailData,
    };
    this.auth.registerUser(payload).subscribe(
      (data) => {
        this.registeredUserResponse$ = data;
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.router.navigateByUrl("login");
        }, 2300);
      },
      (error) => {
        this.errResponse$ = error;
        this.snackBar.open(
          `One or more errors have occured please try again`,
          "X",
          {
            duration: 5000,
          }
        );
        this.errList.push(this.errResponse$);
      }
    );
  }
}

// this.registeredUserResponse$.subscribe(
//   (data) => {
//     setTimeout(() => {
//       this.loading = false;
//       this.router.navigateByUrl(`${data}`);
//     }, 2000);
//   },
//   } catch{
//   (error) => {
//     this.errResponse$ = error;
//     for (let each in error) {
//       this.snackBar.open(
//         `One or more errors have occured please try again`,
//         "X",
//         {
//           duration: 5000,
//         }
//       );
//       this.errList.push(this.errResponse$[each]);
//     }
//   }
// );
