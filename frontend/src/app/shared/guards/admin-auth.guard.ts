import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


/*
 * This guard is currently not used.
 * In future it could be used to protect admin routes
 * by introducing a role in jwt payload.
 * Ex: role: admin or role: user
 */
@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {

    // token is there and not expired
    if (!this.authService.isTokenExpired() /* && this.authService.getRole() === 'admin' */) {

      // if authenticated tries to go to login
      if (route.url.toString().indexOf('login') > -1) {
        // take this admin to his/her admin dashboard
        this.router.navigate(['dashboard/employees']);
        return false;
      }
      return true;
    }

    // JWT Token is expired or this user is not someone with admin role..
    return false;
  }

}
