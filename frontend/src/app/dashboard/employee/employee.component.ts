import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { AuthService, TOKEN_NAME} from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {markFormTouched} from '../../shared/util/utilities';
import {SimpleValidations} from '../../shared/validators/simple.validations';
import {Router} from '@angular/router';
import {AppStateService} from '../../shared/services/appstate.service';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']

})
export class EmployeeComponent implements OnInit {

  public formContact: FormGroup;
  public employees: { _id: number, name: string }[] = [
    { "_id": 1, "name": "Elon Musk" },
    { "_id": 2, "name": "Bill Gates" },
    { "_id": 3, "name": "Steve Harvey" }
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private stateService: AppStateService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.renderUsers();
  }

  onReviewsByEmployee(idx: number) {
    // set the user id on state service
    const selectedId = this.employees[idx]._id;
    console.log('we are about to update this: ' + selectedId);

    this.stateService.setUserIdForReviews(selectedId);
    this.stateService.setUsernameForReviews(this.employees[idx].name);

    // take the user to edit reviews route
    this.router.navigateByUrl('/dashboard/reviews');
  }


  createForm() {
    const formFields = {
      username: ['', [Validators.required/*, SimpleValidations.valdiateUsername*/]],
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('')
    };

    this.formContact = this.formBuilder.group(formFields);
    this.formContact.controls["password"].setValidators([Validators.required]);
    this.formContact.controls["confirmPassword"].setValidators([SimpleValidations.confirmPassword]);

    this.formContact.controls['password']
      .valueChanges
      .subscribe((value) => {
        this.formContact.controls['confirmPassword'].updateValueAndValidity();
      });
  }

  onSubmit() {
    markFormTouched(this.formContact);

    if (this.formContact.valid) {
      console.log(this.formContact.value);

      this.createNewUser().subscribe(
        (response) => {
          console.log('user created!');
          this.renderUsers();
        },
        (error) => {
          console.log('failed to create user!', error);
        });
    } else {
      console.log('Please correct the form before you submit it');
    }
  }

  createNewUser() {
    const url = 'http://localhost:4201/api/v1';
    const payload = {
      name: this.formContact.value.username,
      password: this.formContact.value.password
    };
    return this.http.post<any>(`${url}/users`, payload);
  }

  renderUsers() {
    this.getUsers().subscribe(
      (response) => {
        this.employees = response.result.filter((item) =>
          (item.name !== 'admin'));
        // console.log('users fetched!', this.employees);
      },
      (error) => {
        console.log('failed to create user!', error);
      });
  }

  getUsers() {
    const url = 'http://localhost:4201/api/v1';
    const token = localStorage.getItem(TOKEN_NAME);
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`
    });
    const options = { headers };
    return this.http.get<any>(`${AuthService.API_BASE_PATH}/users`, options);
  }
}
