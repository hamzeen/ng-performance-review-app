import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {

  }

  ngOnInit() {
    const btnLogout = document.getElementsByClassName('header-bar-search');
    if (btnLogout && btnLogout.length > 0) {
      const temp = btnLogout[0] as HTMLElement;

      // make it visible..
      if (this.authService.isTokenExpired()) {
        console.log('NOT AUTHENTICATED');
        temp.style.display ='none';
      } else {
        temp.style.display ='block';
      }

      // add event listener
      btnLogout[0].addEventListener(
        'click',
        () => {
          this.logout();
        }, false);
    }
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.authService.removeToken();
  }
}
