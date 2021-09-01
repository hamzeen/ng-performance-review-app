import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { LandingComponent } from './landing/landing.component';
import {ReviewComponent} from './dashboard/review/review.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    /* intentionally not protected this route to enable easily Singup during assessment evaluation */
    path: 'dashboard/employees',
    component: EmployeeComponent
  },
  {
    path: 'dashboard/reviews',
    component: ReviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'admin', redirectTo: '/dashboard/employees', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' },
];
