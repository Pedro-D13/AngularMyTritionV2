import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { FoodsearchModule } from "./foodsearch/foodsearch.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./auth/profile/profile.component";
import { ErrorComponent } from "./error/error.component";
import { LogoutComponent } from "./auth/logout/logout.component";
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ErrorComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({}),
    FoodsearchModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
