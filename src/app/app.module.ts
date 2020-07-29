import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { FoodsearchModule } from "./foodsearch/foodsearch.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { ProfileComponent } from "./auth/profile/profile.component";

import { LogoutComponent } from "./auth/logout/logout.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment"; // Angular CLI environment
import { EffectsModule } from "@ngrx/effects";
import { MealKanBanEffects } from "./store/meal-kan-ban/effects/meal-kan-ban.effects";
import { KanBanBoardModule } from "./board/kan-ban-board.module";
import { reducer } from "./store/meal-kan-ban/reducers/meal-kan-ban.reducers";
import { AuthenticateService } from "./auth/authenticate.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    KanBanBoardModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ BoardState: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 24,
      logOnly: environment.production,
    }),
    FoodsearchModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    EffectsModule.forRoot([MealKanBanEffects]),
  ],
  providers: [AuthenticateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
