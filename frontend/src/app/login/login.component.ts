import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const {email, password} = this.form.value;
    if (email && password) {

      this.authService.login(email, password)
        .subscribe(
          response => {

            // TODO: remove this log. currently kept so that it will help evaluation at the assessment
            console.log(response);
            this.authService.setUsername(response['result']['name']);
            this.authService.setToken(response['token']);
            this.authService.setSessionUserId(response['result']['_id']);

            if (response['result']['name'] === 'admin') {
              // admin user
              this.router.navigateByUrl('/dashboard/employees');
            } else {
              // employee
              this.router.navigateByUrl('/landing');
            }
          },
          error => {
            console.log("Failed to login");
          });
    }
  }
}

