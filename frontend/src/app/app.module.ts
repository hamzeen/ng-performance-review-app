import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, RequestOptions } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { UserService } from './shared/services/user.service';
import { AuthRequestOptions } from './core/auth-request';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { LandingComponent } from './landing/landing.component';
import { ReviewComponent } from './dashboard/review/review.component';
import {AppStateService} from './shared/services/appstate.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    EmployeeComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AuthService,
    AppStateService,
    UserService,
    {
      provide: RequestOptions,
      useClass: AuthRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
