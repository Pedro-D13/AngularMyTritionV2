import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchboxComponent } from "./foodsearch/searchbox/searchbox.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./auth/profile/profile.component";
import { ErrorComponent } from "./error/error.component";
import { AuthenticatedGuard } from "./auth/authenticated.guard";
import { LogoutComponent } from "./auth/logout/logout.component";

const routes: Routes = [
  { path: "search", component: SearchboxComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "logout", component: LogoutComponent },
  {
    path: "profile",
    canActivate: [AuthenticatedGuard],
    component: ProfileComponent,
  },
  { path: "", component: SearchboxComponent },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
