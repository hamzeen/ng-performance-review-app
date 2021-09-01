import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService, TOKEN_NAME} from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {AppStateService} from '../../shared/services/appstate.service';
import {markFormTouched} from '../../shared/util/utilities';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']

})
export class ReviewComponent implements OnInit {

  public formReview: FormGroup;

  public userName = '';
  public userId: number;
  public tempId = '';

  public reviews: {desc: string, _id: string, year: number}[] = [];

  constructor(
    private http: HttpClient,
    private stateService: AppStateService,
    private userService: UserService,
    private readonly formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.userId = this.stateService.getUserIdForReviews();
    this.userName = this.stateService.getUsernameForReviews();
    this.renderReviews();
  }

  renderReviews() {
    // fetch reviews and handle here..
    this.getReviews().subscribe(
      (response) => {
        this.reviews = response.result;
        console.log('fetch performance reviews');
      },
      (error) => {
        console.log('failed to create user!', error);
      });
  }

  getReviews() {
    const url = 'http://localhost:4201/api/v1';
    const token = localStorage.getItem(TOKEN_NAME);
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`
    });
    const options = { headers };
    return this.http.get<any>(`${AuthService.API_BASE_PATH}/reviews?id=${this.userId}`, options);
  }

  createForm() {
    const formFields = {
      mtnTitle: ['', [Validators.required]],
      year: ['', [Validators.required]]
    };
    this.formReview = this.formBuilder.group(formFields);

    // subscribe to value changes on a field/form if you need validate as the user types in ..
    /*this.formReview.controls['mtnTitle']
      .valueChanges.subscribe((value) => {
        // console.log('review description being typed: ' + value);
      });*/
  }

  onSave() {
    markFormTouched(this.formReview);

    if (this.formReview.valid) {

      console.log(this.formReview.value);
      if (this.tempId === '') {
        // fresh review: Store it in our DB collection for reviews
        this.createReview().subscribe(
          (response) => {
            console.log('review created!', response);
            this.renderReviews();
            this.clearForm();
          },
          (error) => {
            console.log('failed to create performance review!', error);
          });
      } else {
        // update review
        console.log('working progress ...');

        // iterate through map & locate index of the review using its mongodb _id
        const index = this.reviews.findIndex(obj => obj._id === this.tempId);

        if (index > -1) {

          this.reviews[index] = {
            desc: this.formReview.get('mtnTitle').value,
            year: this.formReview.get('year').value,
            _id: this.tempId
          };
          this.clearForm();
        }
      }

    } else {
      console.log('Please correct the form before you submit it');
    }
  }

  createReview() {
    const url = 'http://localhost:4201/api/v1';

    const payload = {
      userId: this.userId,
      year: 2019,
      desc: this.formReview.value.mtnTitle,
      complete: false
    };
    return this.http.post<any>(`${url}/reviews`, payload);
  }


  editReview(idx: number) {
    // look up by id and update the modified object

    this.tempId = this.reviews[idx]._id || this.reviews.length.toString();
    this.formReview.setValue({
      'mtnTitle': this.reviews[idx].desc,
      'year': this.reviews[idx].year
    });
  }

  deleteReview(idx: number) {
    // looks up by id and remove from latest reviews array
    console.log('we are about to remove index: ' + idx);
    this.reviews.splice(idx, 1);
  }


  clearForm() {
    this.tempId = '';
    this.formReview.setValue({'mtnTitle': '', year: ''});
  }
}
