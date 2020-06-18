import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchboxComponent } from "./foodsearch/searchbox/searchbox.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./auth/profile/profile.component";
import { ErrorComponent } from "./error/error.component";
import { AuthenticatedGuard } from "./auth/guards/authenticated.guard";
import { LogoutComponent } from "./auth/logout/logout.component";
import { PlanmealsComponent } from "./foodsearch/planmeals/planmeals.component";
import { MealKanBanComponent } from "./foodsearch/meal-kan-ban/meal-kan-ban.component";
import { LogoutGuard } from "./auth/guards/logout.guard";

const routes: Routes = [
  { path: "search", component: SearchboxComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "login",
    component: LoginComponent,
  },
  { path: "logout", canActivate: [LogoutGuard], component: LogoutComponent },
  {
    path: "profile",
    canActivate: [AuthenticatedGuard],
    component: ProfileComponent,
  },
  {
    path: "meals",
    canActivate: [AuthenticatedGuard],
    component: PlanmealsComponent,
  },
  {
    path: "kanban",
    canActivate: [AuthenticatedGuard],
    component: MealKanBanComponent,
  },
  { path: "", component: SearchboxComponent },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
