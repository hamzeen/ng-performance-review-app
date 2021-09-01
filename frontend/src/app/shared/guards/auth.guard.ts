import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // console.log('Auth Guard: '+ route.url.toString() + ':: ' + route.url.toString().indexOf('timeline'));

    // token is there and not expired
    if (!this.authService.isTokenExpired()) {

      // if authenticated tries to go to login
      if (route.url.toString().indexOf('login') > -1) {
        this.router.navigate(['timeline']);
        return false;
      }
      return true;
    }

    // JWT Token is expired ..
    if (this.authService.isTokenExpired()) {

      // Wants to get to LOGIN, just say OKAY! 'THE LEGIT GUY'
      if (route.url.toString().indexOf('login') > -1) {
        // if this is not handled the auth guard goe into a never ending loop
        return true;
      }

      // Requests a page other than Login, Ask to FIRST LOGIN! 'THE ILL-LEGIT GUY'
      this.router.navigate(['/login']);
      return false;
    }
  }

  // 1. when we receive 401: unauthorized or 403: we delete the token and send user to login page.
}
